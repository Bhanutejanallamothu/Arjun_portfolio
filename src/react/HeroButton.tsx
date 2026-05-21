import { Button } from "../components/ui/Button"

export default function HeroButton() {
  return (
    <Button asChild variant="default" size="lg">
      <a href="#work">
        View My Work
      </a>
    </Button>
  )
}
