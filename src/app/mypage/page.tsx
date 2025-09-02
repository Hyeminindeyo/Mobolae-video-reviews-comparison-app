import { redirect } from 'next/navigation';

import MyPageClient from '@/features/mypage/components/MyPageClient';
import { getMeOrNull } from '@/features/user/services/UsersServer';

export default async function Page() {
  const me = await getMeOrNull();
  if (!me) redirect('/signin');

  return <MyPageClient />;
}
