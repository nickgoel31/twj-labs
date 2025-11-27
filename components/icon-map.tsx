import React from 'react'



import { AppWindow, CodeIcon, GaugeIcon, PaletteIcon, PuzzleIcon, RefreshCcwIcon, ServerIcon, ShieldCheckIcon, ShoppingCartIcon, StoreIcon, WrenchIcon , Code2Icon, PlugIcon, DatabaseIcon, LayoutIcon, RepeatIcon, MessageSquareIcon, SparklesIcon, BrainIcon} from 'lucide-react';
import { FaCode, FaPencilRuler, FaRocket, FaSearch, FaShopify } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';
import {  ArrowUpRight, CheckCircle, Database, Zap } from 'lucide-react';
import { FaWebflow } from 'react-icons/fa6';
import { SearchIcon, LayoutDashboardIcon, PenToolIcon, Share2Icon, MonitorSmartphoneIcon, GitBranchIcon, PlayCircleIcon, BoxesIcon,  SmartphoneIcon } from 'lucide-react'
import { AccessibilityIcon, AlertTriangleIcon, CheckCircleIcon,  DropletIcon, EyeIcon, FileSearchIcon, KeyboardIcon, SpeakerIcon, TagIcon, BookOpenIcon } from 'lucide-react'



export const iconMap: { [key: string]: React.ComponentType<{ size?: number, className?: string }> } = {
  ServerIcon,
  PaletteIcon,
  PuzzleIcon,
  GaugeIcon,
  RefreshCcwIcon,
  ShieldCheckIcon,
  CodeIcon,
  WrenchIcon,
  FaSearch,
  FaPencilRuler,
  FaCode,
  FaRocket,
  IoColorPalette,
  ShoppingCartIcon,
  StoreIcon,
  FaShopify,
  AppWindow,
    Database,
    Zap,
    ArrowUpRight,
    CheckCircle,
    FaWebflow,
    SearchIcon, // Lucide: Search
    LayoutDashboardIcon, // Lucide: LayoutDashboard or PanelsTopLeft
    PenToolIcon, // Lucide: PenTool
    Share2Icon, // Lucide: Share2 or Handshake
    MonitorSmartphoneIcon, // Lucide: MonitorSmartphone
    GitBranchIcon, // Lucide: GitBranch or FlowChart icon
    PlayCircleIcon, // Lucide: PlayCircle
    BoxesIcon, // Lucide: Boxes or Layers
    SmartphoneIcon, // Lucide: Smartphone or Phone
    Code2Icon,
    PlugIcon,
    LayoutIcon,
    DatabaseIcon,
     RepeatIcon,
     MessageSquareIcon,
     SparklesIcon,
     BrainIcon,
      AccessibilityIcon,
      AlertTriangleIcon,
      CheckCircleIcon,
      DropletIcon,
      EyeIcon,
      FileSearchIcon,
      KeyboardIcon,
      SpeakerIcon,
      TagIcon,
      BookOpenIcon,
}
