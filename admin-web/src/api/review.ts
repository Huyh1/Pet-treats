import client from './client';
import type {
  PageResult,
  Review,
  ReviewPageQuery,
  ReviewStatus,
} from '../types/api';

// 评价分页列表
export function fetchReviewPage(params: ReviewPageQuery) {
  return client.get<unknown, PageResult<Review>>('/review/page', {
    params,
  });
}

// 评价审核：通过 / 驳回
export function updateReviewStatus(id: number, status: ReviewStatus) {
  return client.put<unknown, null>(`/review/${id}/status`, undefined, {
    params: { status },
  });
}

// 删除评价
export function deleteReview(id: number) {
  return client.delete<unknown, null>(`/review/${id}`);
}
