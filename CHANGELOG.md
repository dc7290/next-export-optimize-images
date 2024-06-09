# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/).

## [Released](https://github.com/dc7290/next-export-optimize-images/releases)

## [4.5.0](https://github.com/dc7290/next-export-optimize-images/compare/v4.4.0...v4.5.0) (2024-06-09)


### Features

* 🚀 Support `.cjs` ([4e58bdb](https://github.com/dc7290/next-export-optimize-images/commit/4e58bdb061766720c4a9317587015ed66b6a671d))


### Documentation

* ✏️ Handling page swaps and relative paths ([6d86e34](https://github.com/dc7290/next-export-optimize-images/commit/6d86e3405f2cde1614552c53ac70c046425c2939))

## [4.4.0](https://github.com/dc7290/next-export-optimize-images/compare/v4.3.1...v4.4.0) (2024-05-19)


### Features

* 🚀 Add RemoteImage component ([c4b284d](https://github.com/dc7290/next-export-optimize-images/commit/c4b284de4d0ca05657de14ea3263b71c41d1f447)), closes [#652](https://github.com/dc7290/next-export-optimize-images/issues/652)
* 🚀 Add RemotePicture component ([3d4d1d2](https://github.com/dc7290/next-export-optimize-images/commit/3d4d1d2892d21899bcb4250a3bf5d56ec8d074d0))


### Bug Fixes

* **deps:** update dependency sharp to ^0.33.4 ([a0a0fa7](https://github.com/dc7290/next-export-optimize-images/commit/a0a0fa718b8c57c7501da985656aa2e42483186c))


### Documentation

* ✏️ Add case for using another plugin ([3d9e988](https://github.com/dc7290/next-export-optimize-images/commit/3d9e988bd24ef9c31806891d5f731593894e0ad6))

## [4.3.1](https://github.com/dc7290/next-export-optimize-images/compare/v4.3.0...v4.3.1) (2024-04-14)


### Bug Fixes

* 🐛 Enable Node.js-specific APIs in the configuration file ([f5a2805](https://github.com/dc7290/next-export-optimize-images/commit/f5a2805b39a6c886ca73c49b2778818f8b36479c)), closes [#824](https://github.com/dc7290/next-export-optimize-images/issues/824)


### Documentation

* ✏️ Fixed filenameGenerator arguments ([4aebf7a](https://github.com/dc7290/next-export-optimize-images/commit/4aebf7ac78d4257eb79622f60fe39b7e0a6f4496))

## [4.3.0](https://github.com/dc7290/next-export-optimize-images/compare/v4.2.0...v4.3.0) (2024-04-13)


### Features

* 🚀 Support `next start` ([dfb746a](https://github.com/dc7290/next-export-optimize-images/commit/dfb746ad3c812a3cd1a0f24373bee3ba71729a42)), closes [#105](https://github.com/dc7290/next-export-optimize-images/issues/105)


### Performance Improvements

* ⚡️ Minimize readFile execution ([139f459](https://github.com/dc7290/next-export-optimize-images/commit/139f459132b8b174ee8ba2dc67d6816bf618ccfa)), closes [#742](https://github.com/dc7290/next-export-optimize-images/issues/742)


### Tests

* 💍 Fixed test cases ([b9e21ea](https://github.com/dc7290/next-export-optimize-images/commit/b9e21ea10953f998a4e93a168b4c4b32df8b06b2))

## [4.2.0](https://github.com/dc7290/next-export-optimize-images/compare/v4.1.0...v4.2.0) (2024-04-13)


### Features

* 🚀 New feature getOptimizedImageProps implemented ([96342af](https://github.com/dc7290/next-export-optimize-images/commit/96342afee055c0c3465d2f5e17e9a706f2abea9f)), closes [#822](https://github.com/dc7290/next-export-optimize-images/issues/822)


### Bug Fixes

* 🐛 Corrected attribute values for the source element ([e91cb59](https://github.com/dc7290/next-export-optimize-images/commit/e91cb5919c4ad226612be4475ac3040b769ba889))

## [4.1.0](https://github.com/dc7290/next-export-optimize-images/compare/v4.0.0...v4.1.0) (2024-04-12)


### Features

* 🚀 allow changing cacheDir location ([2215bb7](https://github.com/dc7290/next-export-optimize-images/commit/2215bb7f15bd3f7100744ee2a39fd5e6a28b61f8)), closes [#692](https://github.com/dc7290/next-export-optimize-images/issues/692)
* 🚀 Applied additional attributes to Picture Component ([1f8866d](https://github.com/dc7290/next-export-optimize-images/commit/1f8866d1cad350e45ba60baa9214da528cf2749c)), closes [#693](https://github.com/dc7290/next-export-optimize-images/issues/693)


### Bug Fixes

* 🐛 Enables next/image to be used in conjunction with ([5e82ad7](https://github.com/dc7290/next-export-optimize-images/commit/5e82ad7cbe1094d62bc5e9057554861f3170ffe9))
* 🐛 Update sharp to v0.33.3 ([a2d6fa7](https://github.com/dc7290/next-export-optimize-images/commit/a2d6fa7c4b5656b4e575feeb7da713bb0e6fa9d8)), closes [#733](https://github.com/dc7290/next-export-optimize-images/issues/733)


### Tests

* 💍 Add cacheDir config option ([6135ed1](https://github.com/dc7290/next-export-optimize-images/commit/6135ed1e62e64855c581ed03dc9e1026cb5df78d))

## [4.0.0](https://github.com/dc7290/next-export-optimize-images/compare/v3.3.0...v4.0.0) (2024-04-10)


### ⚠ BREAKING CHANGES

* 🧨The minimum version of Next.js is 14.1.0
* 🧨The import destination changes, no longer from next/image, but from
next-export-optimize-images/image.
* 🧨Node.js v16 has been dropped

### Features

* 🚀 Change import options ([9027b63](https://github.com/dc7290/next-export-optimize-images/commit/9027b63b31b15b4280b1e3c3a23cfb6060fbf964)), closes [#820](https://github.com/dc7290/next-export-optimize-images/issues/820) [#696](https://github.com/dc7290/next-export-optimize-images/issues/696) [#796](https://github.com/dc7290/next-export-optimize-images/issues/796)
* 🚀 Node.js minimum version to 18 ([202db6d](https://github.com/dc7290/next-export-optimize-images/commit/202db6d2cd06244254f40a3eabc558548f7304ba))
* 🚀 Support Next.js v14 ([ae716a6](https://github.com/dc7290/next-export-optimize-images/commit/ae716a6f9a39a74a45de351d6458e90df77901f8)), closes [#802](https://github.com/dc7290/next-export-optimize-images/issues/802)


### Bug Fixes

* 🐛 Revive module.exports ([8911e11](https://github.com/dc7290/next-export-optimize-images/commit/8911e11d2c7b54449fe24495ee2c691f841aabb7))


### Continuous Integration

* 🎡 Fixed a problem with Release ending in the middle of a re ([9e6c6af](https://github.com/dc7290/next-export-optimize-images/commit/9e6c6af9ce9aff0ca6862a67d4197e771d53dc11))

## [3.3.0](https://github.com/dc7290/next-export-optimize-images/compare/v3.2.0...v3.3.0) (2024-03-10)


### Features

* 🚀 feat: add config for remote images download delays ([fb05eda](https://github.com/dc7290/next-export-optimize-images/commit/fb05edaeb73b85fb2ac930c30e061c0c0078d6ca))


### Bug Fixes

* **deps:** update dependency fs-extra to ^11.2.0 ([83990ed](https://github.com/dc7290/next-export-optimize-images/commit/83990ed601450ad37ec4a99cfa3d1bb6480022b5))
* **deps:** update dependency sharp to ^0.32.6 ([ea1b24f](https://github.com/dc7290/next-export-optimize-images/commit/ea1b24f4eb3301f3332e97381ee618590b822887))
* **deps:** update dependency sharp to v0.32.6 [security] ([fed526e](https://github.com/dc7290/next-export-optimize-images/commit/fed526eb1056f530121900aa9beb4627a2262589))


### Documentation

* ✏️ add docs info for remoteImagesDownloadsDelay config ([4978490](https://github.com/dc7290/next-export-optimize-images/commit/4978490d9c464af26cbd0539e5ec64e3f5d269d6))

## [3.2.0](https://github.com/dc7290/next-export-optimize-images/compare/v3.1.1...v3.2.0) (2023-09-05)


### Features

* 🚀 add Picture component ([0bf9352](https://github.com/dc7290/next-export-optimize-images/commit/0bf9352809f1d17aaf96231b33fee508930eea8b)), closes [#653](https://github.com/dc7290/next-export-optimize-images/issues/653) [#544](https://github.com/dc7290/next-export-optimize-images/issues/544)
* 🚀 config generateFormats option ([fade51c](https://github.com/dc7290/next-export-optimize-images/commit/fade51cc0d22070984ba4cd3e49b933e17fed566))


### Bug Fixes

* 🐛 e2e test was not run ([446e208](https://github.com/dc7290/next-export-optimize-images/commit/446e208bc27855fa8b86bb8002d04e518f01824c))
* **deps:** update dependency sharp to ^0.32.5 ([07c4e9d](https://github.com/dc7290/next-export-optimize-images/commit/07c4e9d2a5b45bbb3846b15fabe1c1880d9c312e))


### Documentation

* ✏️ Picture component ([0ad3dc6](https://github.com/dc7290/next-export-optimize-images/commit/0ad3dc6a79e947a340deb061bbcdb31c6128efa8))

## [3.1.1](https://github.com/dc7290/next-export-optimize-images/compare/v3.1.0...v3.1.1) (2023-08-31)


### Bug Fixes

* 🐛 Align Svg handling with Next.js ([1d30298](https://github.com/dc7290/next-export-optimize-images/commit/1d30298ac6ccd925447bcaafb8605c74a39cd65d))
* 🐛 Fixed a problem with configurations not working ([92b544c](https://github.com/dc7290/next-export-optimize-images/commit/92b544cd7d251f109ff20f22ebff87417500eb1c)), closes [#612](https://github.com/dc7290/next-export-optimize-images/issues/612)
* **deps:** update dependency sharp to ^0.32.3 ([b626e7f](https://github.com/dc7290/next-export-optimize-images/commit/b626e7f22181333bcebecf253301f93bfac2062c))
* **deps:** update dependency sharp to ^0.32.4 ([5217bdd](https://github.com/dc7290/next-export-optimize-images/commit/5217bdd7eb66deb9afc16971a48ef9234ebf80d5))


### Documentation

* Fix typo on structure page ([3ec2d6b](https://github.com/dc7290/next-export-optimize-images/commit/3ec2d6b5367896eac2d4e392f73241900cde11b3))

## [3.1.0](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.6...v3.1.0) (2023-07-14)


### Features

* 🚀 Support functional remote-images ([87d71a8](https://github.com/dc7290/next-export-optimize-images/commit/87d71a868be15e49ddb7fa977302bdf3aca0c3a5))


### Bug Fixes

* 🐛 Fixed problem with settings not loading during build ([35c817e](https://github.com/dc7290/next-export-optimize-images/commit/35c817e4829f25c26bc7e4d315b9a2aa1e06b61f)), closes [#612](https://github.com/dc7290/next-export-optimize-images/issues/612)

## [3.0.6](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.5...v3.0.6) (2023-07-04)


### Bug Fixes

* 🐛 Supported Next.js13.4.8 ([5a0e7c6](https://github.com/dc7290/next-export-optimize-images/commit/5a0e7c651509956e35490a6376c2a7c127fd683e))

## [3.0.5](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.4...v3.0.5) (2023-07-01)


### Bug Fixes

* 🐛 Fixed loader caching uselessly ([bc10e30](https://github.com/dc7290/next-export-optimize-images/commit/bc10e3077012869d801c3fff5e34148aeab0971a))

## [3.0.4](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.3...v3.0.4) (2023-07-01)


### Bug Fixes

* 🐛 Corrected loader application conditions ([38b1b89](https://github.com/dc7290/next-export-optimize-images/commit/38b1b89fae357c0ccc62f31cd1d0f9272fbbba30))

## [3.0.3](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.2...v3.0.3) (2023-07-01)


### Bug Fixes

* 🐛 Delete Warning for quality ([abe1f19](https://github.com/dc7290/next-export-optimize-images/commit/abe1f19f3378c6d2efcd013bdb3ad67780fe5ed5))
* 🐛 Fixed loader path ([e8bdc63](https://github.com/dc7290/next-export-optimize-images/commit/e8bdc6326889b858df599bde649d74edfebd9e14))

## [3.0.2](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.1...v3.0.2) (2023-07-01)


### Bug Fixes

* 🐛 Fixed an export error ([696261d](https://github.com/dc7290/next-export-optimize-images/commit/696261d9b7d1e2dbb612236333a03b71af2ccd52))

## [3.0.1](https://github.com/dc7290/next-export-optimize-images/compare/v3.0.0...v3.0.1) (2023-07-01)


### Bug Fixes

* 🐛 Fixed support Next.js version ([4624986](https://github.com/dc7290/next-export-optimize-images/commit/4624986e4947a6f8a00980ab904b3f7581317cb7))

## [3.0.0](https://github.com/dc7290/next-export-optimize-images/compare/v2.1.0...v3.0.0) (2023-07-01)


### ⚠ BREAKING CHANGES

* 🧨Next.js version must be at least 13.3.2

### Features

* 🚀 For external images, add them manually ([54a70cb](https://github.com/dc7290/next-export-optimize-images/commit/54a70cb67cb25de03aac39fc8ed8352fc512b989))
* 🚀 Supported AppRouter ([6e5fd71](https://github.com/dc7290/next-export-optimize-images/commit/6e5fd71d993fa188b29277170a7478920aa18301)), closes [#527](https://github.com/dc7290/next-export-optimize-images/issues/527)
* 🚀 Supported next/dynamic ([857ae6b](https://github.com/dc7290/next-export-optimize-images/commit/857ae6b71ea948937ba8c85849e5dacc9380412a)), closes [#106](https://github.com/dc7290/next-export-optimize-images/issues/106)


### Bug Fixes

* 🐛 Changed version of peerDependencies next to 13.0.0 ([fc6e534](https://github.com/dc7290/next-export-optimize-images/commit/fc6e534cf5c1bd770d13ace52c39e17258fe709e))


### Documentation

* ✏️ Fixed Docs ([50847a8](https://github.com/dc7290/next-export-optimize-images/commit/50847a81e6763fd2e4c8d9917f72d760435e2fbc))

## [2.1.0](https://github.com/dc7290/next-export-optimize-images/compare/v2.0.1...v2.1.0) (2023-04-30)


### Features

* 🚀 Support for animated images ([09fef4a](https://github.com/dc7290/next-export-optimize-images/commit/09fef4ab003a6c59287ff593915a5973a8772267)), closes [#495](https://github.com/dc7290/next-export-optimize-images/issues/495)


### Bug Fixes

* **deps:** update dependency sharp to ^0.32.0 ([ba13935](https://github.com/dc7290/next-export-optimize-images/commit/ba139351d8010317db9ae22d56371cdc8718aa06))
* **deps:** update dependency sharp to ^0.32.1 ([07cf2a4](https://github.com/dc7290/next-export-optimize-images/commit/07cf2a4ce514ce4ceacd3863f0be8689c54a84c7))

## [2.0.1](https://github.com/dc7290/next-export-optimize-images/compare/v2.0.0...v2.0.1) (2023-04-01)


### Bug Fixes

* **deps:** update dependency cli-progress to ^3.12.0 ([7047e7a](https://github.com/dc7290/next-export-optimize-images/commit/7047e7ae4420981598ba5d123836903f0c951db3))
* **deps:** update dependency fs-extra to ^11.1.1 ([b16aed9](https://github.com/dc7290/next-export-optimize-images/commit/b16aed9ed27b6725b57f0ecb87a0a626b3a6394d))
* **deps:** update dependency sharp to ^0.31.3 ([7401a78](https://github.com/dc7290/next-export-optimize-images/commit/7401a78c48e044927e3992b548b10aecb141f6df))


### Tests

* 💍 Update snapshot-file for Jest29 ([6b2c8dc](https://github.com/dc7290/next-export-optimize-images/commit/6b2c8dc8b82e4f93a057b6239e341e845e8db0c5))


### Documentation

* ✏️ Update @heroicons/react to v2 ([9a78da2](https://github.com/dc7290/next-export-optimize-images/commit/9a78da2ca083ccd9bd2767412aead1ddc428ef6f))

## [2.0.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.9.2...v2.0.0) (2022-12-17)


### ⚠ BREAKING CHANGES

* 🧨Next.js v12 and below have been dropped.
* 🧨Node.js v14 has been dropped

### Features

* 🚀 Node.js minimum version to 16 ([ac0d7f9](https://github.com/dc7290/next-export-optimize-images/commit/ac0d7f982f6250fc86dba88ae91d38ac00b4ce4d))
* 🚀 Support for Next.js v13 ([ff5a2e2](https://github.com/dc7290/next-export-optimize-images/commit/ff5a2e21fe17932668ca065e04fa3a7eae29c16e))


### Bug Fixes

* 🐛 Fix Config type ([7448857](https://github.com/dc7290/next-export-optimize-images/commit/7448857223a4f2b9da35b519b33b64a069ab446c))
* **deps:** update dependency fs-extra to v11 ([8285c8f](https://github.com/dc7290/next-export-optimize-images/commit/8285c8f9c2c3fbd2754cc773fe37643286a04e57))


### Documentation

* ✏️ Support for Next.js v13 ([51a0ac9](https://github.com/dc7290/next-export-optimize-images/commit/51a0ac96cad53f2678902610fd37c2de4ca76911))

## [1.9.2](https://github.com/dc7290/next-export-optimize-images/compare/v1.9.1...v1.9.2) (2022-12-11)


### Bug Fixes

* 🐛 Removed crypto dependency from client bundle ([ca4ea71](https://github.com/dc7290/next-export-optimize-images/commit/ca4ea71a28f43942971153c124cdac72799806d8)), closes [#332](https://github.com/dc7290/next-export-optimize-images/issues/332)
* **deps:** update dependency got to ^11.8.6 ([3af53e8](https://github.com/dc7290/next-export-optimize-images/commit/3af53e8b342829cdc178f50ade120a374d0ad801))

## [1.9.1](https://github.com/dc7290/next-export-optimize-images/compare/v1.9.0...v1.9.1) (2022-11-28)


### Bug Fixes

* 🐛 ENAMETOOLONG when using long filenames ([eae8c74](https://github.com/dc7290/next-export-optimize-images/commit/eae8c74b1d0a29cfa66fdbcf55f5a0bb838bdea1)), closes [#309](https://github.com/dc7290/next-export-optimize-images/issues/309)
* **deps:** update dependency sharp to ^0.31.1 ([eaa3506](https://github.com/dc7290/next-export-optimize-images/commit/eaa350636edda88022918df661385c80c531c966))
* **deps:** update dependency sharp to ^0.31.2 ([12f0a80](https://github.com/dc7290/next-export-optimize-images/commit/12f0a80efd85efdccef1866f0b8b554139fd2ebb))

## [1.9.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.8.0...v1.9.0) (2022-09-25)


### Features

* 🚀 Support `next/future/image` ([7efc251](https://github.com/dc7290/next-export-optimize-images/commit/7efc251e0000493e4c5539983b79ed1eb0d840e6)), closes [#255](https://github.com/dc7290/next-export-optimize-images/issues/255)

## [1.8.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.7.0...v1.8.0) (2022-09-23)


### Features

* 🚀 Introduced new 'externalOutputDir' config flag ([e585af9](https://github.com/dc7290/next-export-optimize-images/commit/e585af9d115d5591bf3cdce1257f6be709dd9bb5))


### Bug Fixes

* 🐛 delete experimental ([b38cd9e](https://github.com/dc7290/next-export-optimize-images/commit/b38cd9e4cd3bf926ec1ebfacdc2e6cf808021276))
* 🐛 Remov unneeded leading slash from externalOutputDir flag ([e9de680](https://github.com/dc7290/next-export-optimize-images/commit/e9de680527156e10c63c9f4976737a3e074cc0f6))
* **deps:** update dependency sharp to ^0.31.0 ([ef3ed84](https://github.com/dc7290/next-export-optimize-images/commit/ef3ed84bb46925432cb6ed9c5c9c1bd185b841cf))

## [1.7.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.6.2...v1.7.0) (2022-08-31)


### Features

* 🚀 Add sourceImageParser config option ([9b1fbd9](https://github.com/dc7290/next-export-optimize-images/commit/9b1fbd9ea698b927c2675cc3c6c99bb88135da9c))


### Bug Fixes

* 🐛 Documentation update ([21e1b8c](https://github.com/dc7290/next-export-optimize-images/commit/21e1b8c8e46ba768e70a7a89de0662c431660d81))


### Continuous Integration

* 🎡 Install `ts-node` ([2f3ef3b](https://github.com/dc7290/next-export-optimize-images/commit/2f3ef3ba68f72070badb7cc1c66980a97a23a7cf))

## [1.6.2](https://github.com/dc7290/next-export-optimize-images/compare/v1.6.1...v1.6.2) (2022-08-27)


### Bug Fixes

* 🐛 Processing when the image component is not used ([a3dd7b3](https://github.com/dc7290/next-export-optimize-images/commit/a3dd7b3cdae36620ccbbfea2a4c0f63261005720)), closes [#195](https://github.com/dc7290/next-export-optimize-images/issues/195)

## [1.6.1](https://github.com/dc7290/next-export-optimize-images/compare/v1.6.0...v1.6.1) (2022-08-24)


### Bug Fixes

* **deps:** update dependency app-root-path to ^3.1.0 ([2593d23](https://github.com/dc7290/next-export-optimize-images/commit/2593d23f07366fb1cd40ffbdf9e4f32a6bee3d01))
* Minor grammar fix for a warning ([e439bc1](https://github.com/dc7290/next-export-optimize-images/commit/e439bc1fda9d7d73ee3848ea0efc1ce5ad656e36))

## [1.6.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.5.3...v1.6.0) (2022-07-30)


### Features

* 🚀 Supprted monorepo ([13d5aff](https://github.com/dc7290/next-export-optimize-images/commit/13d5aff9d0130b859fb093fafd8545f2c0e4f4ec)), closes [#142](https://github.com/dc7290/next-export-optimize-images/issues/142)


### Bug Fixes

* 🐛 Fix peer-dependence `next` version ([e71586c](https://github.com/dc7290/next-export-optimize-images/commit/e71586c89557061fb8a058ef4edcf86c11526e64))

## [1.5.3](https://github.com/dc7290/next-export-optimize-images/compare/v1.5.2...v1.5.3) (2022-07-06)


### Bug Fixes

* 🐛 Throws an error for `unoptimized` ([7e81b3b](https://github.com/dc7290/next-export-optimize-images/commit/7e81b3bbb511bb62431416bb8c710a223b59ceed)), closes [#129](https://github.com/dc7290/next-export-optimize-images/issues/129)
* **deps:** update dependency cli-progress to ^3.11.2 ([f59d120](https://github.com/dc7290/next-export-optimize-images/commit/f59d120a25aff92f7d944637f62ba1025a00181f))

## [1.5.2](https://github.com/dc7290/next-export-optimize-images/compare/v1.5.1...v1.5.2) (2022-06-29)


### Bug Fixes

* **deps:** update dependency sharp to ^0.30.7 ([5dcb964](https://github.com/dc7290/next-export-optimize-images/commit/5dcb964a4d3ebc93052dce8619903e59860de256))


### Documentation

* ✏️ Applied the DocSearch ([01da0f9](https://github.com/dc7290/next-export-optimize-images/commit/01da0f97215449026511229d231a17640854a561))


### Tests

* 💍 Linting test files with recommended rules ([36d5343](https://github.com/dc7290/next-export-optimize-images/commit/36d53432a711cb18339152cb7600fb0e70fcac42))

## [1.5.1](https://github.com/dc7290/next-export-optimize-images/compare/v1.5.0...v1.5.1) (2022-06-13)


### Bug Fixes

* 🐛 Copy output of unsupported images ([7fefec5](https://github.com/dc7290/next-export-optimize-images/commit/7fefec5ba666a4673e87af4810408ab296c6fc38)), closes [#82](https://github.com/dc7290/next-export-optimize-images/issues/82)


### Documentation

* ✏️ Added page about external images ([36422cc](https://github.com/dc7290/next-export-optimize-images/commit/36422ccbb99dc3b7cfed315c338798e28c399dad))

## [1.5.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.4.0...v1.5.0) (2022-06-12)


### Features

* 🚀 About external-images by @dc7290 in https://github.com/dc7290/next-export-optimize-images/pull/97

## [1.4.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.3.1...v1.4.0) (2022-06-07)


### Features

* 🚀 Allow plugin to accept `configPath` ([864d02a](https://github.com/dc7290/next-export-optimize-images/commit/864d02ab6abe7fb6436b3cc871d6337a2d3ea6b3))


### Bug Fixes

* 🐛 Correctly parse path segment separators ([5b87790](https://github.com/dc7290/next-export-optimize-images/commit/5b87790d48438040ac307235ff7044b7b6f197eb))
* 🐛 Do not generate unnecessary placeholder images ([b8634da](https://github.com/dc7290/next-export-optimize-images/commit/b8634da4ce7f54bb49bab22f8614fa6115387f15))
* 🐛 Running mkdir in a windows environment ([37e5adf](https://github.com/dc7290/next-export-optimize-images/commit/37e5adfa19cb33c9c1402855d1b35b1d37b5e5ae))
* **deps:** update dependency sharp to ^0.30.6 ([1d97979](https://github.com/dc7290/next-export-optimize-images/commit/1d97979288aafb1949b6cfa04f9bfa71fd0eabe6))


### Tests

* 💍 Add e2e testing ([f601390](https://github.com/dc7290/next-export-optimize-images/commit/f6013903c6a22817de34f62c000e1f435db7f709))
* 💍 Fixed test in uniqueItems ([63390c4](https://github.com/dc7290/next-export-optimize-images/commit/63390c4c5737f51916b964896892b20612bf5a82))


### Continuous Integration

* 🎡 Allow windows to set env ([36c8788](https://github.com/dc7290/next-export-optimize-images/commit/36c87883b843984615103baf6ffe599b5327e82c))
* 🎡 Test different types of environments with matrix ([a598229](https://github.com/dc7290/next-export-optimize-images/commit/a5982298de26f1b049555c5d57c6d59a5ad9f845))


### Documentation

* ✏️ Add plugin-configuration page ([7548550](https://github.com/dc7290/next-export-optimize-images/commit/75485509e76f043c6a09be915259e451e5d96e88))

## [1.3.1](https://github.com/dc7290/next-export-optimize-images/compare/v1.3.0...v1.3.1) (2022-05-29)


### Bug Fixes

* **deps:** update dependency sharp to ^0.30.5 ([8e25077](https://github.com/dc7290/next-export-optimize-images/commit/8e250777cabea5e1022e7bbf6bcfc56c587144d6))
* **deps:** update docusaurus monorepo to v2.0.0-beta.21 ([74f635c](https://github.com/dc7290/next-export-optimize-images/commit/74f635c6dbbbac3ed5e6b471cca8571aea9fc598))
* **deps:** update react monorepo to v18 ([ea241dd](https://github.com/dc7290/next-export-optimize-images/commit/ea241dd293aa286892693a62ddb6b94970eae1aa))


### Documentation

* ✏️ Revise comparisons for clarity ([eb94a0e](https://github.com/dc7290/next-export-optimize-images/commit/eb94a0e9fe45915ae28a4116fdd2a8d8d54b658f))

## [1.3.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.2.0...v1.3.0) (2022-05-26)

### Features

- ~~🚀 Add `convertFormat` ([423b819](https://github.com/dc7290/next-export-optimize-images/commit/423b819fef740fbf85757de5ee4bd6980c7754a6))~~
- ~~🚀 Measure the ASSETS in which errors occurred ([4833495](https://github.com/dc7290/next-export-optimize-images/commit/4833495fa91a5e839b1ae12b7464efe55180e08e))~~

### Bug Fixes

- 🐛 Correctly pass `basePath` to src and srcSet ([65916fe](https://github.com/dc7290/next-export-optimize-images/commit/65916fed15d0ea80dce88d775a1b2161717f676d))

### Tests

- ~~💍 Fixed config path ([6b6e986](https://github.com/dc7290/next-export-optimize-images/commit/6b6e986dac234eff9d48afaa1ff74ca3521e916a))~~

### Continuous Integration

- ~~🎡 Run `CI` in PR as well ([490bfd3](https://github.com/dc7290/next-export-optimize-images/commit/490bfd353d976068c28f4af765e2374dd32cae31))~~

### Documentation

- ~~✏️ Add `convertFormat` to the configuration page ([234a93f](https://github.com/dc7290/next-export-optimize-images/commit/234a93f9917145bf7cb038b936adf3cd08cf8e3f))~~
- ~~✏️ Add convertFormat to features ([a64c2cd](https://github.com/dc7290/next-export-optimize-images/commit/a64c2cd784bb6190d61b8ebc7f49d48be7674ab4))~~
- ~~✏️ Add description to Config ([5f21a62](https://github.com/dc7290/next-export-optimize-images/commit/5f21a62fa424857075e5b95203a28490978aceb6))~~

## [1.2.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.1.0...v1.2.0) (2022-05-25)

### Features

- 🚀 Add `convertFormat` ([457c453](https://github.com/dc7290/next-export-optimize-images/commit/457c4530190c9bb3bc1001c3048a9b085ea65bc9))
- 🚀 Measure the ASSETS in which errors occurred ([d936772](https://github.com/dc7290/next-export-optimize-images/commit/d9367721507b31168000294c90027c4888ad0c7b))

### Bug Fixes

- **deps:** update dependency cli-progress to ^3.11.1 ([7f74945](https://github.com/dc7290/next-export-optimize-images/commit/7f7494563818cdcb9b90b1556039f04dab6f02c4))
- **deps:** update dependency prism-react-renderer to v1.3.3 ([7f8e3b2](https://github.com/dc7290/next-export-optimize-images/commit/7f8e3b21fd696340f1426015f6ae9dc84bef41db))

### Continuous Integration

- 🎡 Run `CI` in PR as well ([58f3077](https://github.com/dc7290/next-export-optimize-images/commit/58f307796819658dd6a7c6aa7c8d76a36cca84aa))

### Tests

- 💍 Fixed config path ([9ec7ae8](https://github.com/dc7290/next-export-optimize-images/commit/9ec7ae8e2d50745e6e149923edba48d0cc8db6e6))

### Documentation

- ✏️ Add `convertFormat` to the configuration page ([40f9b5a](https://github.com/dc7290/next-export-optimize-images/commit/40f9b5a11916840ce2ef0454e6be74f17fa675db))
- ✏️ Add description to Config ([4684cfc](https://github.com/dc7290/next-export-optimize-images/commit/4684cfc438b73f593cc18bebdac339cde48cfbe0))
- ✏️ Added `Some images are not displayed` to Q&A ([32e059a](https://github.com/dc7290/next-export-optimize-images/commit/32e059af0ed98f6f9ceeeca70242ac98b6949d59))
- ✏️ Set og:title ([50a92ab](https://github.com/dc7290/next-export-optimize-images/commit/50a92ab73952647256979a63e6ab903a973dd67c))

## [1.1.0](https://github.com/dc7290/next-export-optimize-images/compare/v1.0.1...v1.1.0) (2022-05-21)

### Features

- 🚀 Export type definitions withExportImages ([dfd1bdf](https://github.com/dc7290/next-export-optimize-images/commit/dfd1bdfa4d0b5afda0344721bde453adb3392ec8))

### Performance Improvements

- ⚡️ Use the option to prevent images from being enlarged ([a8209d7](https://github.com/dc7290/next-export-optimize-images/commit/a8209d7386645fc31e267add92dffc01d8884350))

### Continuous Integration

- 🎡 Change renovate schedule ([dd80a4d](https://github.com/dc7290/next-export-optimize-images/commit/dd80a4d961bfccff6c5e76914402cd305b2a17ed))
- 🎡 Corrected settings about releases ([7028fdd](https://github.com/dc7290/next-export-optimize-images/commit/7028fdd3d713e901e2eefcf8b56f8aed724cec21))
- 🎡 Register the title in @semantic-release/changelog ([9087554](https://github.com/dc7290/next-export-optimize-images/commit/908755407606d2775b0c9dde261cffe8c5088c38))

### Documentation

- ✏️ Add Comparison page ([9145d02](https://github.com/dc7290/next-export-optimize-images/commit/9145d02cd522d68ef5d6e61cd9d954af2fd5e4f6))
- ✏️ Add examples page ([2472113](https://github.com/dc7290/next-export-optimize-images/commit/2472113731b7faeffb26950e466afdc182b88c74))
- ✏️ Add footer link ([ed00e68](https://github.com/dc7290/next-export-optimize-images/commit/ed00e68d3b2eb0c79ee5926f7faa1b7abe691fc2))
- ✏️ Add local checks section in Getting Started ([6087661](https://github.com/dc7290/next-export-optimize-images/commit/60876611310d3bf78598a27d9c922d5ec97e95a9))
- ✏️ Add planned features page ([91b5bea](https://github.com/dc7290/next-export-optimize-images/commit/91b5bea44758b5d140c05524649d2cce7d4d5041))
- ✏️ Add Q&A page ([c8fbe69](https://github.com/dc7290/next-export-optimize-images/commit/c8fbe699fdac103eaec49071f7e679febeab9b34))
- ✏️ Add Structure page ([9e1f4a3](https://github.com/dc7290/next-export-optimize-images/commit/9e1f4a32f4a6d124db0b1d6b23048ea2a4a7a649))
- ✏️ Add text to introduction ([7af96e2](https://github.com/dc7290/next-export-optimize-images/commit/7af96e2191c36f8c97dec090b3b77f9f25dffab6))
- ✏️ Add title to code block ([45052ce](https://github.com/dc7290/next-export-optimize-images/commit/45052ce6ad719dfa0390eb8bb3f5d3f7606374df))
- ✏️ Added description ([eeef6a8](https://github.com/dc7290/next-export-optimize-images/commit/eeef6a8979aa9caad415586f5ffc9e7b3b1cb2ec))
- ✏️ Change link text to Introduction ([cd7b635](https://github.com/dc7290/next-export-optimize-images/commit/cd7b635578d65aa8e220a8879116e43296a79748))
- ✏️ Create Getting Started as a separate page ([9d37e87](https://github.com/dc7290/next-export-optimize-images/commit/9d37e872f47e09306111bb849216d45e421f34e0))
- ✏️ Highlight differences ([d2a76bd](https://github.com/dc7290/next-export-optimize-images/commit/d2a76bddd448477fba6d1d244d9863a3db99ce7f))
- ✏️ README Change home page to document site ([422f8db](https://github.com/dc7290/next-export-optimize-images/commit/422f8db2ae08e396ecd5b3987c264f645f9ca674))

## [1.0.1](https://github.com/dc7290/next-export-optimize-images/compare/v1.0.0...v1.0.1) (2022-05-19)

### Bug Fixes

- **deps:** update dependency ansi-colors to ^4.1.3 ([82f2027](https://github.com/dc7290/next-export-optimize-images/commit/82f20276eabc35b5dbe83d54d0dcf0b12d553ae1))

### Documentation

- ✏️ add logo and ogp ([ef3197b](https://github.com/dc7290/next-export-optimize-images/commit/ef3197b0a6304153c1681288aa5d6941bfcd1ce0))
- ✏️ Added `Configuration` page ([365fbd4](https://github.com/dc7290/next-export-optimize-images/commit/365fbd45777a0d22de6aefe3b7eb1ad68da0f614))
- ✏️ Added top page ([2814451](https://github.com/dc7290/next-export-optimize-images/commit/2814451edd9f8b695f028174091ab381785a984c))
- ✏️ Configuration→ Usage ([06994f1](https://github.com/dc7290/next-export-optimize-images/commit/06994f17009e679d93c0829722c8efb753f8eb27))
- ✏️ Corrected title ([d2a8d89](https://github.com/dc7290/next-export-optimize-images/commit/d2a8d8939d0e6b6efbd1fdb05e590bc0fe403b3f))
- ✏️ Feature を修正 ([ea7ef5f](https://github.com/dc7290/next-export-optimize-images/commit/ea7ef5f82cd5f2af8281729dcd3e0211855b98b1))
- ✏️ Fixed README ([f58bf08](https://github.com/dc7290/next-export-optimize-images/commit/f58bf0805328fc2df100862abcb746ce4314a4df))
- ✏️ README の Feature を修正 ([3c02b52](https://github.com/dc7290/next-export-optimize-images/commit/3c02b52c64e611a4668865b52a7b1b8f160b3b2b))
- ✏️ Top page modification ([533064b](https://github.com/dc7290/next-export-optimize-images/commit/533064b558140dc8709aa39297af8fc0de0752cf))

### Continuous Integration

- 🎡 @semantic-release/exec をプラグインに追加 ([8ca1957](https://github.com/dc7290/next-export-optimize-images/commit/8ca19574f5c585bf8b07f93d8be86913feceb6c0))
- 🎡 Added faketty ([a01d7fa](https://github.com/dc7290/next-export-optimize-images/commit/a01d7fa36e9c9d1889c4a9cffd882cee5ed6b8e8))
- 🎡 Github Actions: Release does not run git-cz ([14d25f3](https://github.com/dc7290/next-export-optimize-images/commit/14d25f3520c1079bbb8adb4c561ac8ffd5f5c48c))
- 🎡 リリースブランチを release に変更 ([30b02d5](https://github.com/dc7290/next-export-optimize-images/commit/30b02d5e55a5418ee9befebbff2c72ae03f27c07))
- 🎡 名前の変更 ([f32209a](https://github.com/dc7290/next-export-optimize-images/commit/f32209acf0844e65c9ca11dbd1d7faa6fd7d049a))

## [1.0.0](https://github.com/dc7290/next-export-optimize-images/releases/tag/v1.0.0) (2022-05-17)

### Added

- Everything!
