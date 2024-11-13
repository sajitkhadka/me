import { Suspense } from "react";
import { getPrivacyPolicy } from "./actions";
import { Article } from "@/components/layout/article";

export default async function Page() {

  const privacyPolicy = await getPrivacyPolicy();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {privacyPolicy ? (
        <div className="container py-6 max-w-3xl mx-auto">
          <Article
            post={privacyPolicy}
            includeAuthor={false}
          />
        </div>
      ) : <div>No privacy policy found</div>}
    </Suspense>

  );
}