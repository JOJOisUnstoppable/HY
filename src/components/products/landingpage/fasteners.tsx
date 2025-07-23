// pages/fasteners.tsx
'use client'
import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';

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
  { name: 'Automotive', items: ['Engine mounting bolts', 'Interior trim screws', 'Chassis rivets'] },
  { name: 'Construction', items: ['Structural bolts for steel frames', 'Concrete anchors', 'Roofing screws'] },
  { name: 'Electronics', items: ['Micro screws for circuit boards', 'Connector clips', 'Battery compartment fasteners'] },
  { name: 'Aerospace', items: ['Titanium bolts for airframes', 'High-strength rivets for wings', 'Lock nuts for avionics'] },
  { name: 'Medical Devices', items: ['Stainless steel screws for equipment', 'Sterile fasteners for surgical tools'] }
];

export default function FastenersPage() {
  // Move the useState hook inside the component
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <main>
        {/* 什么是紧固件 */}
        <section id="what-is" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What is a Fastener?</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Fasteners are mechanical components used to join or secure two or more objects together. They create non-permanent or permanent connections, allowing for easy assembly, disassembly, or maintenance when needed.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Common types include screws, bolts, nuts, washers, rivets, and clips, each designed for specific load, material, and environmental conditions. Fasteners work by creating clamping force, friction, or mechanical interlock to prevent separation of connected parts.
              </p>
            </div>
          </div>
        </section>

        {/* 为什么选择高质量紧固件 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose High-Quality Fasteners?</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Fastener Quality</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Load Capacity</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Corrosion Resistance</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Durability</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-800">High-Quality</td>
                    <td className="py-4 px-6 text-gray-600">Meets/exceeds industry standards (e.g., ISO 898)</td>
                    <td className="py-4 px-6 text-gray-600">Premium coatings (zinc, nickel) or materials (stainless steel)</td>
                    <td className="py-4 px-6 text-gray-600">Resists fatigue, vibration loosening</td>
                    <td className="py-4 px-6 text-gray-600">Industrial machinery, aerospace, medical equipment</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-800">Low-Grade</td>
                    <td className="py-4 px-6 text-gray-600">Inconsistent, often below safety thresholds</td>
                    <td className="py-4 px-6 text-gray-600">Minimal/no protection, prone to rust</td>
                    <td className="py-4 px-6 text-gray-600">Fails prematurely under cyclic loads</td>
                    <td className="py-4 px-6 text-gray-600">Temporary fixtures, non-critical DIY projects</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-800">Generic</td>
                    <td className="py-4 px-6 text-gray-600">Moderate but unreliable load handling</td>
                    <td className="py-4 px-6 text-gray-600">Basic plating, limited lifespan</td>
                    <td className="py-4 px-6 text-gray-600">Adequate for light, static loads</td>
                    <td className="py-4 px-6 text-gray-600">Furniture assembly, non-structural parts</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Common Specifications:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Thread Size (Metric: M1.6-M30; Imperial: #0-1/2")</li>
                    <li>Tensile Strength (4.8-12.9 grade for bolts)</li>
                    <li>Drive Type (Phillips, hex, torx, square)</li>
                    <li>Head Style (Countersunk, pan, hexagon)</li>
                    <li>Length (5mm-300mm)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Performance Characteristics:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Torque Requirements (varies by size/grade)</li>
                    <li>Shear Strength (resistance to lateral forces)</li>
                    <li>Fatigue Life (cycles before failure under repeated load)</li>
                    <li>Temperature Resistance (as per material)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 产品系列 */}
        <section id="products" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Our Fastener Product Series</h2>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our product range covers diverse fastener types for every application
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {productSeries.map((product, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{product.title}</h3>
                    <p className="text-gray-600 mb-3">{product.details}</p>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Applications:</span>
                      <p className="text-gray-600">{product.applications}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 紧固件工作原理 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How Do Fasteners Work?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Clamping Force</h3>
                <p className="text-gray-600">
                  Bolts and screws generate tension when tightened, pulling joined parts together. The friction between surfaces prevents slippage, while the fastener's tensile strength resists separation forces.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Mechanical Interlock</h3>
                <p className="text-gray-600">
                  Rivets deform to create a permanent bulge, locking parts in place. Threaded fasteners (nuts/bolts) use helical threads to convert rotational force into linear clamping pressure.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Friction Enhancement</h3>
                <p className="text-gray-600">
                  Washers increase surface area, distributing load and reducing loosening from vibration. Lock nuts feature nylon inserts or deformed threads to create extra friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 组件详情和材料规格 */}
        <section id="specifications" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Component Details and Material Specifications</h2>
            
            <div className="overflow-x-auto mb-12">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">NO</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Component</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Material</th>
                    <th className="py-3 px-6 text-left text-gray-700 font-semibold">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">1</td>
                    <td className="py-4 px-6 font-medium text-gray-800">Screw Head</td>
                    <td className="py-4 px-6 text-gray-600">Carbon Steel/Stainless Steel</td>
                    <td className="py-4 px-6 text-gray-600">Tool engagement for tightening/loosening</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">2</td>
                    <td className="py-4 px-6 font-medium text-gray-800">Threaded Shank</td>
                    <td className="py-4 px-6 text-gray-600">Alloy Steel/Brass</td>
                    <td className="py-4 px-6 text-gray-600">Transmits clamping force via threads</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">3</td>
                    <td className="py-4 px-6 font-medium text-gray-800">Nut</td>
                    <td className="py-4 px-6 text-gray-600">Mild Steel/Stainless Steel</td>
                    <td className="py-4 px-6 text-gray-600">mates with bolt/screw to create clamping force</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">4</td>
                    <td className="py-4 px-6 font-medium text-gray-800">Washer</td>
                    <td className="py-4 px-6 text-gray-600">Steel/Copper</td>
                    <td className="py-4 px-6 text-gray-600">Distributes load, prevents surface damage</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">5</td>
                    <td className="py-4 px-6 font-medium text-gray-800">Rivet Body</td>
                    <td className="py-4 px-6 text-gray-600">Aluminum/Steel</td>
                    <td className="py-4 px-6 text-gray-600">Deforms to create permanent mechanical lock</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-600">6</td>
                    <td className="py-4 px-6 font-medium text-gray-800">Locking Insert (Lock Nuts)</td>
                    <td className="py-4 px-6 text-gray-600">Nylon/Metal</td>
                    <td className="py-4 px-6 text-gray-600">Prevents loosening via friction</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Common Specifications:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Thread Size (Metric: M1.6-M30; Imperial: #0-1/2")</li>
                    <li>Tensile Strength (4.8-12.9 grade for bolts)</li>
                    <li>Drive Type (Phillips, hex, torx, square)</li>
                    <li>Head Style (Countersunk, pan, hexagon)</li>
                    <li>Length (5mm-300mm)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Performance Characteristics:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Torque Requirements (varies by size/grade)</li>
                    <li>Shear Strength (resistance to lateral forces)</li>
                    <li>Fatigue Life (cycles before failure under repeated load)</li>
                    <li>Temperature Resistance (as per material)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 安装和使用指南 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Installation and Usage Guidelines</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Safety Precautions
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Use calibrated torque tools to avoid over/under-tightening</li>
                  <li>Select fastener grade matching application load (e.g., 12.9 grade for high-stress joints)</li>
                  <li>Inspect for thread damage before installation</li>
                  <li>Wear protective gear when working with heavy-duty fasteners</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Installation Best Practices
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Clean mating surfaces to ensure proper clamping</li>
                  <li>Apply thread lubricant for high-torque applications</li>
                  <li>Align parts before tightening to prevent cross-threading</li>
                  <li>Use washers with soft materials (aluminum, plastic) to avoid surface deformation</li>
                </ul>
              </div>
              
              <div className="md:col-span-2 mt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Operational Considerations
                </h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Retorque fasteners after initial load cycles (e.g., in machinery break-in)</li>
                  <li>Replace fasteners exposed to extreme heat or chemical corrosion</li>
                  <li>Avoid mixing dissimilar metals to prevent galvanic reaction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 行业应用 */}
        <section id="applications" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Applications and Industries</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {industries.map((industry, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{industry.name}</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {industry.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Key Benefits</h3>
              <p className="text-gray-700">
                Ensures structural integrity, enables modular assembly, reduces maintenance costs, enhances safety in critical systems, and supports efficient mass production.
              </p>
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 text-gray-500 transition-transform ${expandedFaq === index ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`px-4 overflow-hidden transition-all duration-300 ${
                      expandedFaq === index ? 'max-h-40 py-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系/咨询区域 */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Fastening Solutions?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our experts are ready to help you find the perfect fasteners for your specific application.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-md hover:bg-blue-50 transition-colors shadow-lg"
            >
              Contact Our Team
            </a>
          </div>
        </section>
      </main>
    </>
  )
}