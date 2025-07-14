/**
 * @file Service.tsx
 * @description 首页服务流程展示组件，展示从需求分析到批量生产的四个步骤
 */

interface ServiceProps {
  dict: {
    home: {
      service: {
        title: string
        description: string
        steps: {
          stepOne: {
            title: string
            description: string
          },
          stepTwo: {
            title: string
            description: string
          },
          stepThree: {
            title: string
            description: string
          },
          stepFour: {
            title: string
            description: string
          }
        }
      }
    }
  }
}

export function Service({ dict }: ServiceProps) {
  const steps = [
    {
      number: '1',
      title: dict.home.service.steps.stepOne.title,
      description: dict.home.service.steps.stepOne.description
    },
    {
      number: '2',
      title: dict.home.service.steps.stepTwo.title,
      description: dict.home.service.steps.stepTwo.description
    },
    {
      number: '3',
      title: dict.home.service.steps.stepThree.title,
      description: dict.home.service.steps.stepThree.description
    },
    {
      number: '4',
      title: dict.home.service.steps.stepFour.title,
      description: dict.home.service.steps.stepFour.description
    }
  ]

  return (
    <section className="py-20 bg-slate-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">
            {dict.home.service.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {dict.home.service.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-6 bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:scale-105 hover:bg-slate-750 hover:z-0"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg ring-4 ring-slate-900">
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-8 text-blue-500 transform translate-x-2/3 -translate-y-1/2 z-20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3 mt-4 text-white text-center">{step.title}</h3>
              <p className="text-gray-300 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}