// TODO: 실제 Supabase 클라이언트 생성 로직을 연결해야 함.
// 지금은 Server Action에서 import 경로를 만족시키기 위한 최소 mock입니다.
export const supabaseServer = {
  from: (_table: string) => ({
    insert: async (_payload: unknown) => ({ error: null as unknown }),
  }),
};
