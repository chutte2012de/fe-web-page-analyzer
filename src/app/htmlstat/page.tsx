import Link from "next/link";
import { Suspense } from "react";

const getHtmlStat = async (inputPageUrl: string) => {
  try {
    const res = await fetch(`http://localhost:3000/webpage/htmlstat`, {
      body: JSON.stringify({ url: inputPageUrl }),
      method: "POST",
    });
    const errorCode = res.ok ? false : res.status;
    console.log("errorCode: ", errorCode);
    if (errorCode) {
      const errMsgAsString = await res.text();
      console.log("errMsgAsString: ", errMsgAsString);
      return { htmlStat: "", errorCode: errorCode, errorInfo: errMsgAsString };
    }
    return { htmlStat: await res.json(), errorCode: errorCode, errorInfo: "" };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      htmlStat: "",
      errorCode: 101,
      errorInfo: "Error excuting backend server request",
    };
  }
};

export default async function Page({ searchParams }: any) {
  const { htmlStat, errorCode, errorInfo } = await getHtmlStat(
    searchParams.inputUrl
  );
  return (
    <section>
      <div>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
          <Link
            className="flex justify-end text-blue-600 underline hover:text-blue-800"
            href="/"
          >
            Go back Home
          </Link>
        </div>
      </div>
      <Suspense fallback={<p>Loading feed...</p>}>
        {!errorCode ? (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
            <div className="p-8 space-y-3">
              <div className="font-sans text-lg font-medium text-blue-600">
                Results for: {searchParams?.inputUrl}
              </div>
              <div className="rounded-3xl bg-cyan-300 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-lg">
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>URL:</strong> {htmlStat?.url}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Request Id:</strong> {htmlStat?.id}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Title:</strong> {htmlStat?.title}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Version:</strong> {htmlStat?.version}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Created At:</strong> {htmlStat?.created_at}
                </div>
              </div>

              <div className="rounded-3xl bg-cyan-200 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-base">
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Links Info</strong>
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>External Total Count:</strong>{" "}
                  {htmlStat?.links_info?.summary?.external?.total_count}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>External Reachable Count:</strong>{" "}
                  {htmlStat?.links_info?.summary?.external?.reachable_count}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>External Unreachable Count:</strong>{" "}
                  {htmlStat?.links_info?.summary?.external?.unreachable_count}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Internal Total Count:</strong>{" "}
                  {htmlStat?.links_info?.summary?.internal?.total_count}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Internal Reachable Count:</strong>
                  {htmlStat?.links_info?.summary?.internal?.reachable_count}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Internal Unreachable Count:</strong>{" "}
                  {htmlStat?.links_info?.summary?.internal?.unreachable_count}
                </div>
              </div>

              <div className="rounded-3xl bg-cyan-200 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-base">
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Headers Info</strong>
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>H1 Count:</strong> {htmlStat?.headers?.h1}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>H2 Count:</strong> {htmlStat?.headers?.h2}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>H3 Count:</strong> {htmlStat?.headers?.h3}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>H4 Count:</strong> {htmlStat?.headers?.h4}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>H5 Count:</strong> {htmlStat?.headers?.h5}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>H6 Count:</strong> {htmlStat?.headers?.h6}
                </div>
              </div>

              <div className="rounded-3xl bg-cyan-100 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-mono text-sm text-wrap">
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Links Deatils</strong>
                </div>
                <br></br>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Internal</strong>
                </div>
                <br></br>
                {htmlStat?.links_info?.detail?.internal?.map(
                  (data: any, i: any) => (
                    <div key={i}>
                      <div>
                        <strong>Url: {data.url}</strong>
                      </div>
                      <div>
                        Reachable: {data.reachable}, Status: {data.status}
                      </div>
                    </div>
                  )
                )}

                <br></br>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>External</strong>
                </div>
                <br></br>
                {htmlStat?.links_info?.detail?.external?.map(
                  (data: any, i: any) => (
                    <div key={i}>
                      <div>
                        <strong>Url: {data.url}</strong>
                      </div>
                      <div>
                        Reachable: {data.reachable}, Status: {data.status}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
            <div className="p-8 space-y-3">
              <div className="font-sans text-lg font-medium text-red-700">
                Error Occurred...
              </div>
              <div className="rounded-3xl bg-red-200 py-2 md:py-4 ps-2 md:ps-4 pe-2 md:pe-4 font-sans text-lg">
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Error Code:</strong> {errorCode}
                </div>
                <div className="block mt-1 leading-tight font-medium text-black">
                  <strong>Error Info:</strong> {errorInfo}
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </section>
  );
}
