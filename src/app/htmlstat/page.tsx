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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
      <div className="p-8 space-y-3">
        <div className="rounded-3xl bg-cyan-300 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-xl">
          {/* <div className="tracking-wide text-lg text-indigo-500 font-semibold">
            Input Web Page Url: {searchParams?.inputUrl}
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-black">
            Parsed JSON: {JSON.stringify(searchParams)}
          </div> */}
          <div className="block mt-1 text-sm leading-tight font-medium text-black">
            <strong>URL:</strong> {htmlStat?.url}
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-black">
            <strong>Request Id:</strong> {htmlStat?.id}
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-black">
            <strong>Title:</strong> {htmlStat?.title}
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-black">
            <strong>Version:</strong> {htmlStat?.version}
          </div>
          <div className="block mt-1 text-sm leading-tight font-medium text-black">
            <strong>Created At:</strong> {htmlStat?.created_at}
          </div>
        </div>
        <div className="rounded-3xl bg-cyan-100 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-mono text-sm text-wrap">
          <div>Parsed JSON: {JSON.stringify(searchParams)}</div>
          <div>URL: {htmlStat?.url}</div>
          <div>Summary Id: {htmlStat?.id}</div>
          <div>Created At: {htmlStat?.created_at}</div>
          <div>{JSON.stringify(htmlStat)}</div>
        </div>
      </div>
    </div>
  );
}
