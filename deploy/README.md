# Deploy files

Drafts of what belongs in the `k8s-config` repo. Nothing here is applied from this repo.

| File | Copy to |
| --- | --- |
| `k8s/*.yaml` | `k8s-config/me/` |
| `argocd/me.yaml` | `k8s-config/argocd/applications/me.yaml` |

Order matters, because Argo CD syncs any commit to `k8s-config` within minutes:

1. Add the sealed secret `me-secrets` (ticket 0024) and `regcred` in the `me` namespace.
2. Push a `-dev` tag (for example `v1.3.0-dev`). The workflow builds the image and rewrites the image line in `k8s-config/me/me-deployment.yaml`.
3. Only then copy the manifests and the Argo CD Application, so the pod never starts on the `placeholder` image.

No Ingress: public hosts reach the Service through the Cloudflare Tunnel (ticket 0025).

One-time repo setup: a self-hosted runner for this repo; secrets `REGISTRY_USER`, `REGISTRY_PASSWORD`, `TIPTAP_PRO_TOKEN`, `K8S_CONFIG_DEPLOY_KEY`; repo variable `UMAMI_WEBSITE_ID`.

## Hostnames and search indexing

`https://sajitkhadka.com` is the canonical host: the sitemap, robots.txt, canonical tags and `AUTH_URL` all use it. `next.config.mjs` sends `www.sajitkhadka.com` to it with a 308, so both hostnames must route to this Service in the Cloudflare Tunnel (ticket 0025). Do not add a second redirect in Cloudflare, and keep `/api/health` free of redirects. After the cutover, resubmit the sitemap in Search Console and use "Validate fix" on the redirect and duplicate rows.
