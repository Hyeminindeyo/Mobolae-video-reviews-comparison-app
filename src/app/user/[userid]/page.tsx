import { notFound, redirect } from 'next/navigation';

import MyPageClient from '@/features/mypage/components/MyPageClient';
import { getMeOrNull, getUserByIdOrNull } from '@/features/user/services/UsersServer';

type Props = { params: { userId: string } };

export default async function Page({ params }: Props) {
  const [me, profile] = await Promise.all([getMeOrNull(), getUserByIdOrNull(params.userId)]);
  if (!profile) notFound();

  if (me && String(me.id) === params.userId) {
    redirect('/mypages');
  }
  return <MyPageClient />;
}
