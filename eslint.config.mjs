import nextVitals from "eslint-config-next/core-web-vitals"

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", "out/**", "output/**", "build/**", "next-env.d.ts"],
  },
]

export default config
