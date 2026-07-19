import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { products, type Series, type PetType, type Tag } from '@/data/products';
import { cn } from '@/lib/utils';

const seriesFilters: { value: Series; label: string }[] = [
  { value: 'dog', label: '犬用' },
  { value: 'cat', label: '猫用' },
  { value: 'functional', label: '功能型' },
];

const petTypeFilters: { value: PetType; label: string }[] = [
  { value: 'dog', label: '犬' },
  { value: 'cat', label: '猫' },
];

const tagFilters: { value: Tag; label: string }[] = [
  { value: 'new', label: '新品' },
  { value: 'bestseller', label: '畅销' },
  { value: 'hypoallergenic', label: '低敏' },
];

const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格 · 从低到高' },
  { value: 'price-desc', label: '价格 · 从高到低' },
  { value: 'rating', label: '评分最高' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // 从 URL 同步初始筛选
  const initialSeries = searchParams.get('series');
  const initialTag = searchParams.get('tag');

  const [selectedSeries, setSelectedSeries] = useState<Series[]>(
    initialSeries ? [initialSeries as Series] : []
  );
  const [selectedPetTypes, setSelectedPetTypes] = useState<PetType[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialTag ? [initialTag as Tag] : []
  );
  const [sort, setSort] = useState('default');

  // 监听 URL 变化（点导航时）
  useEffect(() => {
    const s = searchParams.get('series');
    const t = searchParams.get('tag');
    setSelectedSeries(s ? [s as Series] : []);
    setSelectedTags(t ? [t as Tag] : []);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedSeries.length > 0 && !selectedSeries.includes(p.series)) return false;
      if (selectedPetTypes.length > 0 && !selectedPetTypes.some((t) => p.petType.includes(t)))
        return false;
      if (selectedTags.length > 0 && !selectedTags.some((t) => p.tags.includes(t))) return false;
      return true;
    });
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [selectedSeries, selectedPetTypes, selectedTags, sort]);

  const toggle = <T,>(value: T, list: T[], setter: (v: T[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const resetFilters = () => {
    setSelectedSeries([]);
    setSelectedPetTypes([]);
    setSelectedTags([]);
    setSearchParams({});
  };

  const hasFilters =
    selectedSeries.length > 0 || selectedPetTypes.length > 0 || selectedTags.length > 0;

  return (
    <div className="container-edit pt-28 md:pt-36">
      <Breadcrumb
        items={[
          { label: '首页', to: '/' },
          { label: '全部商品' },
        ]}
      />

      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
            All Treats · {products.length} 件
          </p>
          <h1 className="font-display text-display text-cocoa">
            每一份都<span className="italic text-ember">不复杂</span>，
            <br className="hidden md:block" />
            但都做得很认真。
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 rounded-pill border border-cocoa/15 px-4 py-2.5 text-sm lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          筛选
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* 桌面侧栏 */}
        <aside className="hidden lg:col-span-3 lg:block">
          <FilterPanel
            selectedSeries={selectedSeries}
            selectedPetTypes={selectedPetTypes}
            selectedTags={selectedTags}
            onToggleSeries={(v) => toggle(v, selectedSeries, setSelectedSeries)}
            onTogglePetType={(v) => toggle(v, selectedPetTypes, setSelectedPetTypes)}
            onToggleTag={(v) => toggle(v, selectedTags, setSelectedTags)}
            onReset={resetFilters}
            hasFilters={hasFilters}
          />
        </aside>

        {/* 主区 */}
        <div className="lg:col-span-9">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-cocoa/10 pb-4">
            <p className="font-mono text-xs uppercase tracking-widest text-cocoa/60">
              显示 {filtered.length} / {products.length} 件
            </p>
            <div className="flex items-center gap-3">
              <label className="font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
                排序
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-pill border border-cocoa/15 bg-cream-50 px-4 py-2 text-xs text-cocoa focus:border-cocoa focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="grid place-items-center py-24 text-center">
              <p className="font-display text-3xl italic text-cocoa/40">没有找到合适的零食</p>
              <p className="mt-3 text-sm text-cocoa/60">试试清空筛选条件？</p>
              <button onClick={resetFilters} className="btn-ghost mt-6">
                清空筛选
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 移动端筛选抽屉 */}
      {mobileFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-cocoa/40 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="absolute left-0 top-0 flex h-full w-[80%] max-w-sm flex-col bg-cream p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-2xl">筛选</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-cocoa/15"
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterPanel
                selectedSeries={selectedSeries}
                selectedPetTypes={selectedPetTypes}
                selectedTags={selectedTags}
                onToggleSeries={(v) => toggle(v, selectedSeries, setSelectedSeries)}
                onTogglePetType={(v) => toggle(v, selectedPetTypes, setSelectedPetTypes)}
                onToggleTag={(v) => toggle(v, selectedTags, setSelectedTags)}
                onReset={resetFilters}
                hasFilters={hasFilters}
              />
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              查看 {filtered.length} 件结果
            </button>
          </motion.aside>
        </motion.div>
      )}
    </div>
  );
}

interface FilterPanelProps {
  selectedSeries: Series[];
  selectedPetTypes: PetType[];
  selectedTags: Tag[];
  onToggleSeries: (v: Series) => void;
  onTogglePetType: (v: PetType) => void;
  onToggleTag: (v: Tag) => void;
  onReset: () => void;
  hasFilters: boolean;
}

function FilterPanel(props: FilterPanelProps) {
  return (
    <div className="space-y-7">
      <FilterGroup title="系列">
        {seriesFilters.map((s) => (
          <Checkbox
            key={s.value}
            label={s.label}
            checked={props.selectedSeries.includes(s.value)}
            onChange={() => props.onToggleSeries(s.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="宠物类型">
        {petTypeFilters.map((s) => (
          <Checkbox
            key={s.value}
            label={s.label}
            checked={props.selectedPetTypes.includes(s.value)}
            onChange={() => props.onTogglePetType(s.value)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="标签">
        {tagFilters.map((s) => (
          <Checkbox
            key={s.value}
            label={s.label}
            checked={props.selectedTags.includes(s.value)}
            onChange={() => props.onToggleTag(s.value)}
          />
        ))}
      </FilterGroup>

      {props.hasFilters && (
        <button
          onClick={props.onReset}
          className="text-xs text-ember underline underline-offset-4"
        >
          清空全部筛选
        </button>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-cocoa/50">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5">
      <span
        className={cn(
          'grid h-5 w-5 place-items-center rounded-md border transition-all',
          checked ? 'border-cocoa bg-cocoa text-cream-50' : 'border-cocoa/30 bg-transparent'
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
            <path
              d="M2 6l3 3 5-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={cn('text-sm', checked ? 'text-cocoa' : 'text-cocoa/70')}>{label}</span>
    </label>
  );
}
