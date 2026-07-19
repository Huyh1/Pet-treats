import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  App,
  Divider,
} from 'antd';
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCategoryList } from '../api/category';
import { createProduct, fetchProductDetail, updateProduct } from '../api/product';
import type { PetType, Product, ProductPayload } from '../types/api';

const { Title } = Typography;
const { TextArea } = Input;

interface FormValues {
  name: string;
  categoryId: number;
  series?: string;
  petType?: PetType;
  price: number;
  weight?: string;
  imageUrl?: string;
  description?: string;
  story?: string;
  ingredients?: { value: string }[];
  nutrition?: { key: string; value: string }[];
  feedingAdvice?: string;
  tags?: { value: string }[];
  rating?: number;
  monthlySales?: number;
  status?: number;
}

// 表单值 → 后端 payload
function toPayload(values: FormValues): ProductPayload {
  return {
    name: values.name,
    categoryId: values.categoryId,
    series: values.series || undefined,
    petType: values.petType,
    price: values.price,
    weight: values.weight || undefined,
    imageUrl: values.imageUrl || undefined,
    description: values.description || undefined,
    story: values.story || undefined,
    ingredients: (values.ingredients || [])
      .map((i) => i.value?.trim())
      .filter(Boolean),
    nutrition: (values.nutrition || []).reduce<Record<string, string>>(
      (acc, kv) => {
        const k = kv.key?.trim();
        if (k) acc[k] = kv.value?.trim() || '';
        return acc;
      },
      {},
    ),
    feedingAdvice: values.feedingAdvice || undefined,
    tags: (values.tags || [])
      .map((t) => t.value?.trim())
      .filter(Boolean),
    rating: values.rating,
    monthlySales: values.monthlySales,
    status: values.status ?? 1,
  };
}

// 商品 → 表单初始值
function toFormValues(p: Product): FormValues {
  return {
    name: p.name,
    categoryId: p.categoryId,
    series: p.series,
    petType: p.petType,
    price: p.price,
    weight: p.weight,
    imageUrl: p.imageUrl,
    description: p.description,
    story: p.story,
    ingredients: (p.ingredients || []).map((v) => ({ value: v })),
    nutrition: p.nutrition
      ? Object.entries(p.nutrition).map(([k, v]) => ({ key: k, value: v }))
      : [],
    feedingAdvice: p.feedingAdvice,
    tags: (p.tags || []).map((v) => ({ value: v })),
    rating: p.rating,
    monthlySales: p.monthlySales,
    status: p.status,
  };
}

export default function ProductEdit() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);

  const categoryQuery = useQuery({
    queryKey: ['category', 'list'],
    queryFn: fetchCategoryList,
    staleTime: 5 * 60 * 1000,
  });

  const detailQuery = useQuery({
    queryKey: ['product', 'detail', id],
    queryFn: () => fetchProductDetail(Number(id)),
    enabled: isEdit,
  });

  // 详情加载完后回填表单
  useEffect(() => {
    if (detailQuery.data) {
      form.setFieldsValue(toFormValues(detailQuery.data));
    }
  }, [detailQuery.data, form]);

  const createMutation = useMutation({
    mutationFn: (payload: ProductPayload) => createProduct(payload),
  });
  const updateMutation = useMutation({
    mutationFn: (payload: ProductPayload) =>
      updateProduct(Number(id), payload),
  });

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const payload = toPayload(values);
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateMutation.mutateAsync(payload);
        message.success('更新成功');
      } else {
        await createMutation.mutateAsync(payload);
        message.success('创建成功');
      }
      queryClient.invalidateQueries({ queryKey: ['product', 'page'] });
      navigate('/product');
    } catch {
      // 错误已由拦截器统一提示
    } finally {
      setSubmitting(false);
    }
  };

  const pageTitle = useMemo(
    () => (isEdit ? '编辑商品' : '新增商品'),
    [isEdit],
  );

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/product')}
        >
          返回
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          {pageTitle}
        </Title>
      </Space>

      <Spin spinning={isEdit && detailQuery.isLoading}>
        <Card style={{ borderRadius: 12, border: 'none' }}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              status: 1,
              petType: 'both',
              ingredients: [],
              nutrition: [],
              tags: [],
            }}
          >
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="商品名称"
                  rules={[{ required: true, message: '请输入商品名称' }]}
                >
                  <Input placeholder="如：冻干鸡肉粒" maxLength={100} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  name="categoryId"
                  label="分类"
                  rules={[{ required: true, message: '请选择分类' }]}
                >
                  <Select
                    placeholder="请选择"
                    options={(categoryQuery.data || []).map((c) => ({
                      label: c.name,
                      value: c.id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="series" label="系列">
                  <Input placeholder="如：元气系列" maxLength={50} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={6}>
                <Form.Item name="petType" label="宠物类型">
                  <Select
                    options={[
                      { label: '狗', value: 'dog' },
                      { label: '猫', value: 'cat' },
                      { label: '通用', value: 'both' },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  name="price"
                  label="价格（元）"
                  rules={[{ required: true, message: '请输入价格' }]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    placeholder="0.00"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="weight" label="重量">
                  <Input placeholder="如：100g" maxLength={20} />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="status" label="状态">
                  <Select
                    options={[
                      { label: '上架', value: 1 },
                      { label: '下架', value: 0 },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="imageUrl" label="图片 URL">
              <Input placeholder="https://..." />
            </Form.Item>

            <Form.Item name="description" label="商品描述">
              <TextArea rows={3} maxLength={500} showCount />
            </Form.Item>

            <Form.Item name="story" label="品牌故事">
              <TextArea rows={3} maxLength={500} showCount />
            </Form.Item>

            <Divider orientation="left" plain>
              原料
            </Divider>
            <Form.List name="ingredients">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'value']}
                        noStyle
                      >
                        <Input
                          placeholder="如：鸡胸肉"
                          style={{ width: 320 }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: '#ff4d4f' }}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    style={{ width: 200 }}
                  >
                    添加原料
                  </Button>
                </>
              )}
            </Form.List>

            <Divider orientation="left" plain>
              营养成分（键值对）
            </Divider>
            <Form.List name="nutrition">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'key']}
                        noStyle
                      >
                        <Input placeholder="成分名" style={{ width: 160 }} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'value']}
                        noStyle
                      >
                        <Input placeholder="含量" style={{ width: 200 }} />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: '#ff4d4f' }}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    style={{ width: 200 }}
                  >
                    添加营养成分
                  </Button>
                </>
              )}
            </Form.List>

            <Divider orientation="left" plain>
              喂食建议
            </Divider>
            <Form.Item name="feedingAdvice">
              <TextArea rows={3} maxLength={500} showCount />
            </Form.Item>

            <Divider orientation="left" plain>
              标签
            </Divider>
            <Form.List name="tags">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'value']}
                        noStyle
                      >
                        <Input
                          placeholder="如：低脂"
                          style={{ width: 240 }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: '#ff4d4f' }}
                      />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                    style={{ width: 200 }}
                  >
                    添加标签
                  </Button>
                </>
              )}
            </Form.List>

            <Row gutter={24} style={{ marginTop: 16 }}>
              <Col xs={24} md={6}>
                <Form.Item name="rating" label="评分（0-5）">
                  <InputNumber
                    min={0}
                    max={5}
                    precision={1}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item name="monthlySales" label="月销">
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Space style={{ marginTop: 8 }}>
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={submitting}
              >
                {isEdit ? '保存修改' : '创建商品'}
              </Button>
              <Button onClick={() => navigate('/product')}>取消</Button>
            </Space>
          </Form>
        </Card>
      </Spin>
    </div>
  );
}
