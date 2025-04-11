const getHtmlStat = async (inputPageUrl: string) => {
  const res = await fetch(`http://localhost:3000/webpage/htmlstat`, {
    body: JSON.stringify({ url: inputPageUrl }),
    method: "POST",
  });
  return res.json();
};

interface Params {
  params: { pageurl: string; inputUrl: string };
}

export default async function Page({ params, searchParams }: any) {
  const htmlStatData = getHtmlStat(searchParams.inputUrl);
  const [htmlStat] = await Promise.all([htmlStatData]);
  return (
    <div>
      <div>Parsed JSON: {JSON.stringify(searchParams)}</div>
      <div>URL: {htmlStat?.url}</div>
      <div>Summary Id: {htmlStat?.summary_id}</div>
      <div>Created At: {htmlStat?.created_at}</div>
      <div>{JSON.stringify(htmlStat)}</div>
    </div>
  );
}
