import {
  Shield, LayoutDashboard, ScanSearch, AlertTriangle, FileText, Cpu, Menu, X,
  Clock3, Plus, Eye, ArrowRight, Mail, LockKeyhole, Activity, BrainCircuit,
  Search, ChevronRight, SlidersHorizontal, CircleHelp, Upload, Check, Trash2,
  Network, FileCode, ArrowLeft, RefreshCw, CheckCircle2, Info, Layers
} from 'lucide-react';

const icons = {
  shield: Shield, layout: LayoutDashboard, scan: ScanSearch, alert: AlertTriangle,
  file: FileText, cpu: Cpu, menu: Menu, x: X, clock: Clock3, plus: Plus, eye: Eye,
  arrowRight: ArrowRight, mail: Mail, lock: LockKeyhole, activity: Activity,
  brain: BrainCircuit, search: Search, chevronRight: ChevronRight, filter: SlidersHorizontal,
  sliders: SlidersHorizontal, help: CircleHelp, upload: Upload, check: Check, trash: Trash2, network: Network,
  fileCode: FileCode, arrowLeft: ArrowLeft, refresh: RefreshCw, checkCircle: CheckCircle2,
  info: Info, layers: Layers
};

export function Icon({ name, size = 18, strokeWidth = 1.8, className = '' }) {
  const C = icons[name] || CircleHelp;
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
