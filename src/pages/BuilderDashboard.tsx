import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Home, ShoppingCart, Users, BarChart3, Settings,
  Plus, TrendingUp, Eye, MapPin, Bell, Search, LogOut, Menu, X
} from 'lucide-react';

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: Building2, label: 'My Projects', active: false },
  { icon: Home, label: 'Properties', active: false },
  { icon: ShoppingCart, label: 'Orders', active: false },
  { icon: Users, label: 'Leads', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const statsData = [
  { label: 'Total Properties', value: '124', change: '+12%', icon: Home, trend: 'up' },
  { label: 'Active Leads', value: '58', change: '+8%', icon: Users, trend: 'up' },
  { label: 'Site Visits', value: '2.4K', change: '+24%', icon: Eye, trend: 'up' },
  { label: 'Revenue', value: '₹12.5L', change: '+15%', icon: TrendingUp, trend: 'up' },
];

const recentProjects = [
  { name: 'Green Valley Residences', location: 'Bangalore', status: 'Active', units: 120, sold: 89 },
  { name: 'Skyline Heights', location: 'Mumbai', status: 'Upcoming', units: 200, sold: 0 },
  { name: 'Palm Gardens', location: 'Pune', status: 'Active', units: 80, sold: 64 },
  { name: 'Royal Enclave', location: 'Hyderabad', status: 'Completed', units: 150, sold: 148 },
];

const recentLeads = [
  { name: 'Rajesh Kumar', interest: 'Green Valley - 3BHK', time: '2 hours ago', status: 'Hot' },
  { name: 'Priya Sharma', interest: 'Skyline Heights - 2BHK', time: '5 hours ago', status: 'Warm' },
  { name: 'Amit Patel', interest: 'Palm Gardens - Villa', time: '1 day ago', status: 'New' },
];

export default function BuilderDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 glass-card-strong border-r border-border/30 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-display text-lg">V</span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">Vista View</span>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm transition-all duration-300 ${
                item.active
                  ? 'bg-accent text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border/30">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="glass-card-strong border-b border-border/30 px-4 md:px-8 py-4 flex items-center justify-between rounded-none">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground text-sm font-sans">Welcome back, Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 rounded-xl">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-sans outline-none w-40"
              />
            </div>
            <button className="relative w-10 h-10 rounded-xl glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary" />
            </button>
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-sans text-sm">BK</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 rounded-2xl group hover:glow transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-emerald-light font-sans text-sm font-medium">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold font-display gold-text">{stat.value}</div>
                <div className="text-muted-foreground font-sans text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gold-gradient text-primary-foreground font-semibold px-6 py-3 rounded-xl font-sans text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Property
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card text-foreground font-semibold px-6 py-3 rounded-xl font-sans text-sm flex items-center gap-2 hover:border-primary/30 transition-colors"
            >
              <Building2 className="w-4 h-4" />
              New Project
            </motion.button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Projects Table */}
            <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border/30">
                <h3 className="font-display text-xl font-bold text-foreground">Recent Projects</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left px-6 py-3 text-muted-foreground font-sans text-xs uppercase tracking-wider">Project</th>
                      <th className="text-left px-6 py-3 text-muted-foreground font-sans text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-3 text-muted-foreground font-sans text-xs uppercase tracking-wider">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.map((project, i) => (
                      <motion.tr
                        key={project.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="border-b border-border/10 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-foreground font-sans text-sm font-medium">{project.name}</div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs font-sans mt-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-sans font-medium ${
                            project.status === 'Active' ? 'bg-emerald/20 text-emerald-light' :
                            project.status === 'Completed' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full gold-gradient rounded-full transition-all duration-1000"
                                style={{ width: `${project.units > 0 ? (project.sold / project.units) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground text-xs font-sans whitespace-nowrap">
                              {project.sold}/{project.units}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-border/30">
                <h3 className="font-display text-xl font-bold text-foreground">Recent Leads</h3>
              </div>
              <div className="p-4 space-y-3">
                {recentLeads.map((lead, i) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-foreground font-sans text-sm font-medium">{lead.name}</span>
                      <span className={`text-xs font-sans font-medium px-2 py-0.5 rounded-full ${
                        lead.status === 'Hot' ? 'bg-destructive/20 text-destructive' :
                        lead.status === 'Warm' ? 'bg-primary/20 text-primary' :
                        'bg-accent text-accent-foreground'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs font-sans">{lead.interest}</p>
                    <p className="text-muted-foreground/60 text-xs font-sans mt-1">{lead.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
