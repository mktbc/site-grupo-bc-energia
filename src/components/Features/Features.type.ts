export type FeaturesProps = {
  id: string
  icon:
    | string
    | {
        url: string
        size: Array<number>
      }
  title: string
}
