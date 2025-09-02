import 'server-only';
import serverApi from '@/shared/api/serverApi';

type BaseUser = {
  id: number;
  nickname: string;
  image?: string;
  description?: string;
  followersCount: number;
  followeesCount: number;
  averageRating?: number;
  reviewCount?: number;
  isFollowing?: boolean;
};

export type MeResponse = BaseUser; // 내정보
export type UserResponse = BaseUser; // 유저 정보

export async function getMeOrNull(): Promise<MeResponse | null> {
  try {
    const me = await serverApi.get('/user/me');
    return me as MeResponse;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('401')) return null; // 미인증
    throw e;
  }
}

export async function getUserByIdOrNull(userId: string | number): Promise<UserResponse | null> {
  try {
    const profile = await serverApi.get(`/users/${userId}`);
    return profile as UserResponse;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('404')) return null; // 없는 유저
    throw e;
  }
}
