import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle, Layers, Shield, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Schoolgle
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  A comprehensive school management system with modular architecture
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/admin" passHref>
                  <Button size="lg" className="h-12">
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-12">
                  Learn more
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                alt="Schoolgle Dashboard Preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src="/dashboard-preview.png"
                width={550}
                height={310}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Platform Features
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to manage your educational institution efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Activity Management</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Track and schedule activities happening within school premises</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-amber-500" />
                </div>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Document and manage risk assessments for school facilities</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle>Issue Tracker</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Log, track, and resolve maintenance issues throughout the school</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <CardTitle>Incidents</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Record and manage incidents that occur on school grounds</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Schools Nationwide
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                See what educational institutions are saying about Schoolgle.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Oakridge Academy</CardTitle>
                <CardDescription>Sarah Johnson, Principal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "Schoolgle has transformed how we manage our facilities. The module-based approach allows us to pay for only what we need."
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Westside High School</CardTitle>
                <CardDescription>James Anderson, Facilities Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">
                  "The incident tracking feature has been invaluable for improving safety protocols and responding quickly to issues."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5 dark:bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your School Management?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Start using Schoolgle today and experience the difference.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/admin" passHref>
                <Button size="lg" className="h-12">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 md:py-12 bg-gray-100 dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link href="#" className="text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm hover:underline">
                Contact
              </Link>
              <Link href="#" className="text-sm hover:underline">
                About
              </Link>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Schoolgle. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}