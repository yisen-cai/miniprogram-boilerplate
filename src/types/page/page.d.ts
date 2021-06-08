
interface BaseParam extends Record<string, string> {
  id: string
}


interface CompleteParam extends Record<string, string> {
  message: string,
  url: string,
  next: string
}