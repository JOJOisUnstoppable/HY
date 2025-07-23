// pages/fasteners.tsx
'use client'
import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import { BentoGrid } from "@/components/magicui/bento-grid";

// Move these constant declarations outside
const pageMetadata = {
  title: 'Fasteners | Professional Fastening Solutions',
  description: 'Comprehensive fastening solutions for industrial assembly, construction, and manufacturing. High-quality screws, bolts, nuts, and more.',
  coverImage: '/images/product/navbar/big-fastener.jpg'
};

// FAQ数据
const faqs = [
  {
    question: 'Difference between bolt and screw',
    answer: 'Bolts are designed to be used with nuts; screws thread directly into a tapped hole or material (wood, plastic, metal).'
  },
  {
    question: 'Choosing fastener material',
    answer: 'For outdoor use, select 304/316 stainless steel; for high strength, choose 8.8+ grade alloy steel.'
  },
  {
    question: 'Reusability',
    answer: 'Threaded fasteners can be reused if threads are undamaged; rivets and blind fasteners are single-use.'
  },
  {
    question: 'Torque calculation',
    answer: 'Torque = K × D × F (K=coefficient, D=thread diameter, F=clamping force) – refer to industry charts for K values.'
  },
  {
    question: 'Corrosion prevention',
    answer: 'Apply anti-corrosion coatings (zinc plating), use dielectric grease, or select corrosion-resistant materials.'
  },
  {
    question: 'Load capacity',
    answer: 'Depends on thread size (larger diameter = higher load), material grade, and installation torque.'
  }
];

// 产品系列数据
const productSeries = [
  {
    title: 'Screws',
    details: 'Phillips, flathead, hexagon, and torx drives. Materials: Carbon steel (zinc-plated), stainless steel (304/316). Sizes: M1.6 to M12.',
    applications: 'Electronics, furniture, automotive interiors.'
  },
  {
    title: 'Bolts',
    details: 'Hex bolts, carriage bolts, eye bolts. Materials: Alloy steel (8.8/10.9 grade), stainless steel. Sizes: M6 to M30.',
    applications: 'Structural frameworks, machinery, construction.'
  },
  {
    title: 'Nuts & Washers',
    details: 'Hex nuts, lock nuts, flat washers, spring washers. Materials: Matching bolt materials with anti-corrosion options.',
    applications: 'Distribute load, prevent loosening in all bolted connections.'
  },
  {
    title: 'Rivets',
    details: 'Blind rivets, solid rivets, pop rivets. Materials: Aluminum, steel, copper.',
    applications: 'Aerospace, automotive body panels, sheet metal joining.'
  }
];

// 行业应用数据
const industries = [
  { name: 'Automotive', items: ['Engine mounting bolts', 'Interior trim screws', 'Chassis rivets'], color: 'from-blue-500 to-blue-700' },
  { name: 'Construction', items: ['Structural bolts for steel frames', 'Concrete anchors', 'Roofing screws'], color: 'from-orange-500 to-orange-700' },
  { name: 'Electronics', items: ['Micro screws for circuit boards', 'Connector clips', 'Battery compartment fasteners'], color: 'from-green-500 to-green-700' },
  { name: 'Aerospace', items: ['Titanium bolts for airframes', 'High-strength rivets for wings', 'Lock nuts for avionics'], color: 'from-purple-500 to-purple-700' },
  { name: 'Medical Devices', items: ['Stainless steel screws for equipment', 'Sterile fasteners for surgical tools'], color: 'from-red-500 to-red-700' }
];

export default function FastenersPage() {
  // Move the useState hook inside the component
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Professional
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Fastening </span>
                Solutions
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Comprehensive fastening solutions for industrial assembly, construction, and manufacturing. High-quality screws, bolts, nuts, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Products
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                  Technical Specs
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 什么是紧固件 */}
        <section id="what-is" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6">
                <span className="text-2xl">🔩</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                What is a Fastener?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-8" />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Fasteners are mechanical components used to join or secure two or more objects together. They create non-permanent or permanent connections, allowing for easy assembly, disassembly, or maintenance when needed.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Common types include screws, bolts, nuts, washers, rivets, and clips, each designed for specific load, material, and environmental conditions. Fasteners work by creating clamping force, friction, or mechanical interlock to prevent separation of connected parts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 为什么选择高质量紧固件 */}
        <section className="py-24 bg-gradient-to-br from-slate-100 to-blue-50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
                <span className="text-2xl">⭐</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Why Choose High-Quality Fasteners?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8" />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 mb-16">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-slate-800 to-slate-700">
                    <tr>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Fastener Quality</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Load Capacity</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Corrosion Resistance</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Durability</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Applications</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                      <td className="py-6 px-8 font-bold text-green-700 text-lg">High-Quality</td>
                      <td className="py-6 px-8 text-gray-700">Meets/exceeds industry standards (e.g., ISO 898)</td>
                      <td className="py-6 px-8 text-gray-700">Premium coatings (zinc, nickel) or materials (stainless steel)</td>
                      <td className="py-6 px-8 text-gray-700">Resists fatigue, vibration loosening</td>
                      <td className="py-6 px-8 text-gray-700">Industrial machinery, aerospace, medical equipment</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300">
                      <td className="py-6 px-8 font-bold text-red-700 text-lg">Low-Grade</td>
                      <td className="py-6 px-8 text-gray-700">Inconsistent, often below safety thresholds</td>
                      <td className="py-6 px-8 text-gray-700">Minimal/no protection, prone to rust</td>
                      <td className="py-6 px-8 text-gray-700">Fails prematurely under cyclic loads</td>
                      <td className="py-6 px-8 text-gray-700">Temporary fixtures, non-critical DIY projects</td>
                    </tr>
                    <tr className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-300">
                      <td className="py-6 px-8 font-bold text-yellow-700 text-lg">Generic</td>
                      <td className="py-6 px-8 text-gray-700">Moderate but unreliable load handling</td>
                      <td className="py-6 px-8 text-gray-700">Basic plating, limited lifespan</td>
                      <td className="py-6 px-8 text-gray-700">Adequate for light, static loads</td>
                      <td className="py-6 px-8 text-gray-700">Furniture assembly, non-structural parts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">📊</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Common Specifications</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Thread Size (Metric: M1.6-M30; Imperial: #0-1/2")
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Tensile Strength (4.8-12.9 grade for bolts)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Drive Type (Phillips, hex, torx, square)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Head Style (Countersunk, pan, hexagon)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Length (5mm-300mm)
                  </li>
                </ul>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Performance Characteristics</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Torque Requirements (varies by size/grade)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Shear Strength (resistance to lateral forces)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Fatigue Life (cycles before failure under repeated load)
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Temperature Resistance (as per material)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 产品系列 */}
        <section id="products" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-cyan-50/50" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6">
                <span className="text-2xl">🛠️</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Fastener Product Series
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8" />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our product range covers diverse fastener types for every application
              </p>
            </div>
            <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[20rem] gap-6">
              {productSeries.map((product, index) => (
                <div 
                  key={index} 
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-white/20 hover:scale-105"
                >
                  <div className="p-8 h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-500" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">{product.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow relative z-10 leading-relaxed">{product.details}</p>
                    <div className="relative z-10">
                      <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Applications:</span>
                      <p className="text-gray-700 mt-1">{product.applications}</p>
                    </div>
                  </div>
                </div>
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* 紧固件工作原理 */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-5" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6">
                <span className="text-2xl">⚙️</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                How Do Fasteners Work?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Clamping Force</h3>
                <p className="text-gray-300 leading-relaxed">
                  Bolts and screws generate tension when tightened, pulling joined parts together. The friction between surfaces prevents slippage, while the fastener's tensile strength resists separation forces.
                </p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mechanical Interlock</h3>
                <p className="text-gray-300 leading-relaxed">
                  Rivets deform to create a permanent bulge, locking parts in place. Threaded fasteners (nuts/bolts) use helical threads to convert rotational force into linear clamping pressure.
                </p>
              </div>
              
              <div className="group bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Friction Enhancement</h3>
                <p className="text-gray-300 leading-relaxed">
                  Washers increase surface area, distributing load and reducing loosening from vibration. Lock nuts feature nylon inserts or deformed threads to create extra friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 组件详情和材料规格 */}
        <section id="specifications" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/50" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mb-6">
                <span className="text-2xl">🔬</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Component Details and Material Specifications
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto mb-8" />
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 mb-16">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-emerald-700 to-teal-700">
                    <tr>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">NO</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Component</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Material</th>
                      <th className="py-6 px-8 text-left text-white font-bold text-lg">Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { no: 1, component: 'Screw Head', material: 'Carbon Steel/Stainless Steel', function: 'Tool engagement for tightening/loosening' },
                      { no: 2, component: 'Threaded Shank', material: 'Alloy Steel/Brass', function: 'Transmits clamping force via threads' },
                      { no: 3, component: 'Nut', material: 'Mild Steel/Stainless Steel', function: 'mates with bolt/screw to create clamping force' },
                      { no: 4, component: 'Washer', material: 'Steel/Copper', function: 'Distributes load, prevents surface damage' },
                      { no: 5, component: 'Rivet Body', material: 'Aluminum/Steel', function: 'Deforms to create permanent mechanical lock' },
                      { no: 6, component: 'Locking Insert (Lock Nuts)', material: 'Nylon/Metal', function: 'Prevents loosening via friction' }
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300">
                        <td className="py-6 px-8 text-gray-700 font-bold text-lg">{row.no}</td>
                        <td className="py-6 px-8 font-semibold text-gray-800 text-lg">{row.component}</td>
                        <td className="py-6 px-8 text-gray-700">{row.material}</td>
                        <td className="py-6 px-8 text-gray-700">{row.function}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 安装和使用指南 */}
        <section className="py-24 bg-gradient-to-br from-slate-100 to-blue-50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6">
                <span className="text-2xl">📋</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Installation and Usage Guidelines
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Safety Precautions</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Eye Protection:</strong> Always wear safety glasses when drilling or driving fasteners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Proper Tools:</strong> Use correct driver size to prevent cam-out and injury</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Material Compatibility:</strong> Verify fastener material matches application environment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Load Limits:</strong> Never exceed manufacturer's specified load ratings</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Best Practices</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Pre-drilling:</strong> Drill pilot holes for screws in hardwood or metal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Torque Control:</strong> Use torque wrench for critical applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Thread Engagement:</strong> Ensure minimum 1.5x diameter thread engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Lubrication:</strong> Apply thread locker or anti-seize as specified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 行业应用 */}
        <section id="applications" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-fuchsia-50/50" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full mb-6">
                <span className="text-2xl">🏭</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Industry Applications
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto mb-8" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-xl">{industry.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{industry.name}</h3>
                  <ul className="space-y-3">
                    {industry.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-gray-700">
                        <span className={`w-2 h-2 bg-gradient-to-r ${industry.color} rounded-full mt-2 mr-3 flex-shrink-0`}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section id="faq" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-5" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mb-6">
                <span className="text-2xl">❓</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8" />
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/20 transition-all duration-300"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                    <span className={`text-cyan-400 text-2xl transition-transform duration-300 ${expandedFaq === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-8 pb-6 text-gray-300 leading-relaxed border-t border-white/10">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系/咨询区域 */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <span className="text-2xl">📞</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8" />
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Contact our fastener experts for personalized recommendations and technical support for your specific application needs.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                  Get Technical Support
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 text-lg">
                  Download Catalog
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}