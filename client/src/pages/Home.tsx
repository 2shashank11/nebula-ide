import { Button } from "@/components/ui/button"
import { Code2, Cloud, ShieldCheck, Terminal, Code } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Welcome to <span className="text-primary"> Nebula IDE</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Your cloud-powered development playground. Build, run, and collaborate—anywhere, anytime.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link to="/signup">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">Login</Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
          <FeatureCard
            icon={<Cloud className="h-6 w-6 text-primary" />}
            title="Cloud-native"
            description="Spin up secure environments instantly using Docker containers and scale on demand."
          />
          <FeatureCard
            icon={<Terminal className="h-6 w-6 text-primary" />}
            title="Built-in Terminal"
            description="Write, compile, and execute code with an interactive terminal experience—right from your browser."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-primary" />}
            title="Isolated & Secure"
            description="Each project runs in its own sandboxed container. Your code is protected and isolated."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Start building in the cloud with Nebula IDE
        </h2>
        <p className="mt-4 text-muted-foreground">
          No installs. No configs. Just code.
        </p>
        {/* <div className="mt-6">
          <Link to="/signup">
            <Button size="lg">Launch Nebula</Button>
          </Link>
        </div> */}
      </section>
    </main>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
