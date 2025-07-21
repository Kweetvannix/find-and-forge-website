
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = React.useContext(NextThemesProvider.Context || {})

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return { theme: "light", setTheme: () => {} }
  }

  return { theme, setTheme }
}
