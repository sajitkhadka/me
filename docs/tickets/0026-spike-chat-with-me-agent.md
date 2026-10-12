# 0026 — Spike: "chat with me" agent over career material

**Status:** open
**Type:** spike
**Created:** 2026-10-12

## Description

Sajit has talked about adding a chat agent to the site that answers questions about his career, so a recruiter can talk to it. It would also show his AI work. Open questions are cost, how good a local model can be on 6 GB of VRAM, and what the agent is allowed to know.

Rule: the agent may read only public-safe material from the `career` repo and the blog. It must never read the English trainer `data/` folder (profile, worklog, feedback), because those contain employer details and information about colleagues.

Output of this spike: a short written recommendation, not a finished feature.

- [ ] Source list agreed: which `career/` files are public-safe, and what to strip
- [ ] Hosted API vs local model compared on cost and quality for 20 sample questions
- [ ] Abuse and cost limits defined (rate limit, max tokens, daily cap)
- [ ] Refusal behaviour decided (off-topic and private questions)
- [ ] Recommendation: build, defer or skip

## How to research

`career/interview/*` (STAR answers) is a ready-made question and answer set. Use the claude-api skill for the hosted option. Run it on the cluster only after [0022](0022-self-host-on-k3s.md).
