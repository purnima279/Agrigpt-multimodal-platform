import { Link } from "react-router-dom";
import {
  Plus,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Target,
  Layers,
  FileCheck,
  TrendingUp,
  Sparkles,
  Bot,
  Compass,
  AlertTriangle,
  Droplets,
  DollarSign,
} from "lucide-react";
import { useFarms } from "@/features/farms/useFarms";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/Button";
import { Spinner, EmptyState } from "@/components/ui/Feedback";

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { data: farms, isLoading } = useFarms();

  const totalAcres = farms?.reduce((acc, f) => acc + f.farm_size, 0) ?? 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-mist bg-gradient-to-r from-white via-paper to-sage-light/40 p-8 shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <span className="text-2xs font-bold uppercase tracking-widest text-harvest">
            AgriGPT Multimodal Ecosystem &middot; Real-Time Operations
          </span>
          <h1 className="font-display text-3xl font-bold text-ink mt-1">
            Welcome back, {user?.full_name?.split(" ")[0]}
          </h1>
          <p className="mt-2 text-sm text-ink/70 leading-relaxed">
            AI + IoT multimodal platform for safer, smarter, and inclusive farming. Field intelligence, real-time safety alerts, precision variable-rate spraying, and fact-grounded agronomy advisories.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/multimodal">
              <Button variant="primary" className="flex items-center gap-2 shadow-sm">
                <Cpu className="h-4 w-4" />
                Launch Multimodal AI (98.8%)
              </Button>
            </Link>
            <Link to="/hazards">
              <Button variant="secondary" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-rust" />
                Edge CV Hazard Radar
              </Button>
            </Link>
            <Link to="/farms/new">
              <Button variant="secondary" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Farm
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Ecosystem High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-mist bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">Monitored Plots</span>
            <Compass className="h-5 w-5 text-harvest" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{farms?.length ?? 0} Farms</p>
          <p className="mt-1 text-2xs text-ink/60">{totalAcres.toFixed(1)} Total Acres under management</p>
        </div>

        <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Diagnostic Precision</span>
            <Sparkles className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-emerald-950">98.8%</p>
          <p className="mt-1 text-2xs text-emerald-800">-35% false negatives via multimodal fusion</p>
        </div>

        <div className="rounded-xl border border-blue-300 bg-blue-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Chemical Input Cut</span>
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-blue-950">-82.6%</p>
          <p className="mt-1 text-2xs text-blue-800">Precision spraying vs blanket uniform doses</p>
        </div>

        <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Profit Uplift Target</span>
            <DollarSign className="h-5 w-5 text-amber-700" />
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-amber-950">+$45 / Plot</p>
          <p className="mt-1 text-2xs text-amber-900">30% crop yield losses avoided early</p>
        </div>
      </div>

      {/* Quick Launch Action Grid */}
      <div>
        <h2 className="font-display text-lg font-bold text-ink mb-4">Core Ecosystem Capabilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/hazards"
            className="rounded-2xl border border-mist bg-white p-5 shadow-sm transition-all hover:border-rust hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-rust/15 p-2.5 text-rust">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink/30 group-hover:text-rust transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-ink mt-3">Real-Time Safety & CV</h3>
            <p className="mt-1 text-xs text-ink/60">
              YOLOv8 Edge CV hazard identification for venomous snakes, toxic drift plumes, and machinery with buzzer alerts.
            </p>
          </Link>

          <Link
            to="/multimodal"
            className="rounded-2xl border border-mist bg-white p-5 shadow-sm transition-all hover:border-harvest hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-harvest/15 p-2.5 text-harvest-dark">
                <Cpu className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink/30 group-hover:text-harvest transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-ink mt-3">Diagnostic Accuracy (98.8%)</h3>
            <p className="mt-1 text-xs text-ink/60">
              Multimodal fusion of leaf photos, speech symptoms, and telemetry across 15 disease pathology classes.
            </p>
          </Link>

          <Link
            to="/precision-spraying"
            className="rounded-2xl border border-mist bg-white p-5 shadow-sm transition-all hover:border-sage hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-sage/15 p-2.5 text-sage">
                <Target className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink/30 group-hover:text-sage transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-ink mt-3">Precision Input Efficiency</h3>
            <p className="mt-1 text-xs text-ink/60">
              Variable-Rate Application (VRA) zone map cutting fertilizer & pesticide use by 80–90% while preserving yield.
            </p>
          </Link>

          <Link
            to="/simulation"
            className="rounded-2xl border border-mist bg-white p-5 shadow-sm transition-all hover:border-blue-400 hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700">
                <Layers className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink/30 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-ink mt-3">3D Simulation Learning Lab</h3>
            <p className="mt-1 text-xs text-ink/60">
              Interactive WebGL growth-stage simulator with day/night cycles, thermal cameras, and canopy stress maps.
            </p>
          </Link>

          <Link
            to="/governance"
            className="rounded-2xl border border-mist bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-800">
                <FileCheck className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink/30 group-hover:text-emerald-700 transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-ink mt-3">Trust & Governance</h3>
            <p className="mt-1 text-xs text-ink/60">
              Six-principle ethical framework anchored to ICAR, PAU, and TNAU verified repositories with immutable audit logs.
            </p>
          </Link>

          <Link
            to="/pilot"
            className="rounded-2xl border border-mist bg-white p-5 shadow-sm transition-all hover:border-harvest hover:shadow-md group"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-harvest/15 p-2.5 text-harvest-dark">
                <TrendingUp className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink/30 group-hover:text-harvest transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-ink mt-3">Pilot to Scale (500 Farms)</h3>
            <p className="mt-1 text-xs text-ink/60">
              Empirical multi-district impact metrics: 142 hazards intercepted, +18.4% yield gain, 94.6% satisfaction.
            </p>
          </Link>
        </div>
      </div>

      {/* Your Managed Farms Section */}
      <div className="rounded-2xl border border-mist bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-mist pb-4 mb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Your Farm Holdings & Plots</h2>
            <p className="text-xs text-ink/60">
              Click any farm to access soil tests, NPK prescriptions, weather windows, economics, and AI agronomist.
            </p>
          </div>
          <Link to="/farms/new">
            <Button variant="secondary" className="text-xs">
              <Plus className="h-3.5 w-3.5" />
              Add Farm
            </Button>
          </Link>
        </div>

        {isLoading && <Spinner label="Loading farm profiles..." />}

        {farms && farms.length === 0 && (
          <EmptyState
            title="No farms yet"
            description="Add your first farm to get started."
            action={
              <Link to="/farms/new">
                <Button variant="secondary">
                  <Plus className="h-4 w-4" />
                  Add a farm
                </Button>
              </Link>
            }
          />
        )}

        {farms && farms.length > 0 && (
          <>
            <div className="divide-y divide-mist">
              {farms.map((farm) => (
                <div
                  key={farm.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-mist-light/20 rounded-xl px-2 transition-colors"
                >
                  <div>
                    <Link to={`/farms/${farm.id}`} className="font-display text-base font-bold text-ink hover:text-harvest">
                      {farm.farm_name}
                    </Link>
                    <p className="text-xs text-ink/60 mt-0.5">
                      {farm.location} &middot; {farm.farm_size} {farm.farm_size_unit} &middot; Soil:{" "}
                      <strong>{farm.soil_type ?? "Loam"}</strong>
                    </p>
                  </div>

                  {/* Direct Tab Quick Links */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <Link
                      to={`/farms/${farm.id}/soil`}
                      className="rounded-lg border border-mist bg-paper px-2.5 py-1 text-ink/70 hover:border-harvest hover:text-ink font-medium"
                    >
                      Soil Record
                    </Link>
                    <Link
                      to={`/farms/${farm.id}/fertilizer-irrigation`}
                      className="rounded-lg border border-mist bg-paper px-2.5 py-1 text-ink/70 hover:border-harvest hover:text-ink font-medium"
                    >
                      Fertilizer & Water
                    </Link>
                    <Link
                      to={`/farms/${farm.id}/weather`}
                      className="rounded-lg border border-mist bg-paper px-2.5 py-1 text-ink/70 hover:border-harvest hover:text-ink font-medium"
                    >
                      Weather Window
                    </Link>
                    <Link
                      to={`/farms/${farm.id}/economics`}
                      className="rounded-lg border border-mist bg-paper px-2.5 py-1 text-ink/70 hover:border-harvest hover:text-ink font-medium"
                    >
                      Economics (+$45)
                    </Link>
                    <Link
                      to={`/farms/${farm.id}/assistant`}
                      className="rounded-lg bg-sage/15 text-sage border border-sage/30 px-2.5 py-1 font-bold flex items-center gap-1 hover:bg-sage hover:text-white transition-colors"
                    >
                      <Bot className="h-3.5 w-3.5" />
                      AI Agronomist
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/farms"
              className="mt-4 inline-block text-sm font-medium text-harvest hover:text-harvest-dark"
            >
              View all farms
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

