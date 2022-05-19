---
sidebar_position: 1
---

# Introduction

Next.js is a very good framework and has become indispensable for web development.  
That is exactly why, once people get used to this developer experience, they may not want to develop without Next.js.
(I am one of them lol.)

However, Next.js' export functionality also has its limitations, the most discussed of which is **image optimization**.  
https://github.com/vercel/next.js/discussions/19065

Using this repository, you can get the full benefits of `next/image` even when using `next export` by doing image optimization at build time.

This makes it possible to build a high performance website with this solution, whether you want to build a simple website or a completely static output.

## Feature

- Optimize images at build time.
- All options for `next/image` available
- Using `sharp`, so it's fast.
- Cache prevents repeating the same optimization
- Support TypeScript
