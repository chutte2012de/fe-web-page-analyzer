const getHtmlStat = async (inputPageUrl: string) => {
  const res = await fetch(`http://localhost:3000/webpage/htmlstat`, {
    body: JSON.stringify({ url: "abc1234.com" }),
    method: "POST",
  });
  return res.json();
};

interface Params {
  params: { pageurl: string; inputUrl: string };
}

export default async function Page({ params, searchParams }: any) {
  const htmlStatData = getHtmlStat(params.pageurl);
  const [htmlStat] = await Promise.all([htmlStatData]);
  return (
    <div>
      <div>Parsed JSON: {JSON.stringify(params)}</div>
      <div>Parsed JSON: {JSON.stringify(searchParams)}</div>
      <div>{params.inputUrl}</div>
      <div>{params.pageurl}</div>
      <div>URL: {htmlStat?.url}</div>
      <div>Summary Id: {htmlStat?.summary_id}</div>
      <div>Created At: {htmlStat?.created_at}</div>
      <div>{JSON.stringify(htmlStat)}</div>
    </div>
  );
}
