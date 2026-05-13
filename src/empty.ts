// Empty module used as a browser-side fallback for the node-only requires
// (`fs`, `crypto`, `path`) that `RemoteImage` lazy-requires during SSG. The
// runtime gate `typeof window === 'undefined'` ensures the body never runs in
// the browser; this stub just satisfies the bundler's resolve step.
export {}
