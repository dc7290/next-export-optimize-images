---
description: This page presents a comparison with other similar libraries.
---

# Comparison with similar libraries

It is very difficult to write this page objectively, but on the other hand I understand that it is very important for developers.

We will do our best to avoid bias and provide fair and accurate information, but if you find something wrong or inaccurate, please let us know by submitting an Issue!

## next-optimized-images

https://github.com/cyrilwanner/next-optimized-images

It is probably the most famous of Next.js' image optimization libraries.
Compared to our library, it has the following characteristics

- Optimize images using `webpack`'s `loader` feature.
- No need to use `next/image`

Let me list some of the disadvantages.

- Update stopped on August 9, 2020.
- Bundle size is bloated when long strings such as srcSet are needed to bundle images with webpack.

Because of the above features, we would like to compare our library with this one and recommend our library to the following users.

- **I want to use `next/image` to optimize images.**
- **I'm using `responsive-loader`, but I'm concerned about the bundle size of images.**

## next-image-export-optimizer

https://github.com/Niels-IO/next-image-export-optimizer

Since this library is very similar to ours, it would be very good for you to try this one as well.

A brief comparison with our library reveals the following characteristics for your reference.

- Import and use your own components.
- Specify a directory, such as `public/images`, and the images in it will be processed.

Let me list some of the disadvantages.

- All options for `next/image` are not available.
- Only strings can be specified in the src attribute.
- Images that are not used will also be optimized. (Increased build time)

Because of the above characteristics, the library is recommended for users other than those listed below.

- I want to use `<ExportedImage />` instead of `<Image />`.

## Please let me know if there are others!

If you know of any other similar libraries, please let us know [here](https://github.com/dc7290/next-export-optimize-images/issues/new)!  
I'll cry and be happy lol.😂
