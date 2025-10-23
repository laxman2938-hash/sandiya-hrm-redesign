'use client';

export default function PolicyPage() {

  const professionalPillars = [
    {
      point: 'At Sandiya Human Resources Pvt. Ltd., we maintain a robust business structure, sustainable business model, and governance framework that uphold legal, ethical, and responsible practices.'
    },
    {
      point: 'We seamlessly integrate ethical recruitment and labor supply standards into our operations through effective management systems, ensuring compliance, transparency, and accountability at every stage.'
    },
    {
      point: 'Our relationships with clients and recruiters are built on openness and collaboration, fostering strategic partnerships that deliver mutual benefit and shared success.'
    },
    {
      point: 'At the core of our approach is a worker-centered philosophy. We prioritize the well-being, satisfaction, and engagement of our workforce, recognizing their invaluable contributions to our long-term success and sustainable growth.'
    },
  ];

  const ethicalStandards = [
    {
      title: 'No Recruitment Fees',
      description: 'Workers are never charged any recruitment fees, and if any evidence of fee-charging is found, workers are promptly reimbursed.'
    },
    {
      title: 'Clear Job Offers',
      description: 'Job offers are transparent, ensuring that workers fully understand the nature of the work and the associated terms and conditions.'
    },
    {
      title: 'Data Privacy',
      description: 'We adhere to national laws and principles of confidentiality in the collection, storage, and processing of workers\' personal data.'
    },
    {
      title: 'Child Labor',
      description: 'We strictly prohibit the use of child labor in any form.'
    },
    {
      title: 'Legal Eligibility',
      description: 'Workers must possess legal eligibility to work in the relevant country, region, and job role, meeting all necessary requirements.'
    },
    {
      title: 'Formal Employment',
      description: 'Workers are employed or engaged in formal and lawfully recognized relationships, offering regular work opportunities.'
    },
    {
      title: 'Fair Compensation',
      description: 'All workers are paid accurately and on time, in accordance with national laws and contractual agreements, including payment for all working time and entitlement to paid holidays and benefits.'
    },
    {
      title: 'Safe Working Conditions',
      description: 'We ensure that all workers operate in safe environments, and accommodation provided meets basic needs and legal standards.'
    },
    {
      title: 'Transport Safety',
      description: 'Transportation provided for workers complies with relevant national laws and safety guidelines.'
    },
    {
      title: 'Freedom of Association',
      description: 'Workers\' rights to freedom of association are respected throughout the recruitment and employment process.'
    },
    {
      title: 'Equal Opportunity',
      description: 'Fair and equal opportunities are provided to all workers, without discrimination or mistreatment.'
    },
    {
      title: 'Protection from Mistreatment',
      description: 'Workers are safeguarded from mistreatment, including discrimination, harassment, and bullying.'
    },
    {
      title: 'Access to Remedy',
      description: 'Adequate remedies are accessible to all workers if they encounter any issues during recruitment and employment.'
    },
    {
      title: 'Job Mobility',
      description: 'Workers are not unreasonably restricted from pursuing employment opportunities elsewhere.'
    },
    {
      title: 'Termination Procedures',
      description: 'Contract terminations are handled responsibly, ensuring that workers receive all entitled pay and benefits.'
    },
    {
      title: 'Preventing Exploitation',
      description: 'Proactive measures are taken to minimize the risk of forced labor, trafficking, or other forms of exploitation, with appropriate responses if discovered.'
    },
    {
      title: 'Protection of Workers',
      description: 'We prioritize the protection of workers from any form of mistreatment, including discrimination, harassment, and bullying, throughout their recruitment and employment journey.'
    },
    {
      title: 'Misconduct and Mistreatment',
      description: 'In the event of any misconduct or mistreatment, we ensure that appropriate remedies are readily accessible to all workers, providing avenues for reporting and addressing grievances promptly.'
    },
    {
      title: 'Choice of Free Employment',
      description: 'Workers are afforded the freedom to pursue employment opportunities with the labor user they are supplied to or connected parties without unjustified restrictions, empowering them to make informed career choices.'
    },
    {
      title: 'Contract Terminations',
      description: 'When it comes to contract terminations, we handle the process responsibly, ensuring that workers receive all outstanding pay and entitled benefits without delay or complications.'
    },
    {
      title: 'Mitigation of Exploitation',
      description: 'To mitigate the risk of exploitation, we take proactive measures to prevent forced labor, trafficking, or any other forms of hidden third-party labor exploitation during recruitment and employment. If any such instances are uncovered, we respond swiftly and decisively, implementing corrective actions to address the situation effectively.'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">POLICY</h1>
          <p className="text-xl text-blue-100">
            Our Commitment to Ethical Recruitment and Responsible Labor Practices
          </p>
        </div>
      </section>

      {/* Policy Commitments Header */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-slate-900">Policy Commitments</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Sandiya Human Resources Pvt. Ltd. is committed to integrating the Responsible Recruitment Pillars and Standards outlined below into all aspects of our operations and supply chains.
          </p>
        </div>
      </section>

      {/* Professional Pillars Section */}
      <section className="py-16 px-4 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-slate-900">Professional Pillars</h3>

          <div className="space-y-6">
            {professionalPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border-l-4 border-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <span className="text-blue-600 text-2xl font-bold shrink-0 mt-1">•</span>
                  <p className="text-slate-700 leading-relaxed text-lg">{pillar.point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Standards Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-slate-900">Ethical Standards</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ethicalStandards.map((standard, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-lg p-6 hover:shadow-lg transition"
              >
                <h4 className="text-lg font-bold mb-3 text-slate-900 flex items-center gap-2">
                  <span className="text-blue-600 text-2xl">✓</span>
                  {standard.title}
                </h4>
                <p className="text-slate-700 leading-relaxed">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Adherence Section */}
      <section className="py-16 px-4 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">We strictly adhere to below compliances</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-blue-100 rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">About Us</h3>
              <p className="text-slate-700 mb-6">
                Sandiya Human Resources Pvt. Ltd. offers zero-cost recruitment services to empower candidates to join the global workforce while connecting the right talent with the right job.
              </p>
              <a href="/about-us" className="inline-block text-blue-600 font-bold hover:text-blue-700 transition">
                READ MORE →
              </a>
            </div>

            <div className="bg-white border border-blue-100 rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Contact Info</h3>
              <div className="space-y-3 text-slate-700">
                <p><strong>CALL:</strong> +977 014374161</p>
                <p><strong>WRITE:</strong> sandiyahr17@gmail.com</p>
                <p><strong>FIND US:</strong> Dhumbarahi, Kathmandu</p>
              </div>
              <a href="/contact" className="inline-block text-blue-600 font-bold hover:text-blue-700 transition mt-4">
                READ MORE →
              </a>
            </div>

            <div className="bg-white border border-blue-100 rounded-lg p-8 shadow-md md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Our Clients</h3>
              <p className="text-slate-700">
                We proudly partner with 500+ leading companies globally across various industries including technology, manufacturing, hospitality, and more.
              </p>
              <a href="/clients" className="inline-block text-blue-600 font-bold hover:text-blue-700 transition mt-4">
                READ MORE →
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
