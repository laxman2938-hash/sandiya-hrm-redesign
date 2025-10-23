'use client';

export default function QualityCompliancePage() {

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Quality Compliance</h1>
        </div>
      </section>

      {/* Anti-Corruption and Ethics Policy */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-blue-600">Anti-Corruption and Ethics Policy</h2>
          
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              At Sandiya Human Resources Pvt. Ltd., we are committed to conducting our business with honesty and integrity. We maintain a zero-tolerance approach to bribery, corruption, extortion, and embezzlement, and comply with all relevant laws of Nepal, including the Prevention of Corruption Act 2059 (2002 A.D.).
            </p>

            <p>
              In this policy, a "third party" refers to any individual or organization we interact with in the course of our work, including actual or potential customers, suppliers, agents, consultants, partners, and business contacts.
            </p>

            <p className="font-semibold text-slate-900">To mitigate risks, we have implemented the following measures:</p>
            
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>An anti-corruption and bribery code applicable to all employees and stakeholders.</li>
              <li>Training programs to ensure all employees understand and comply with this policy.</li>
              <li>Regular reviews and updates to maintain alignment with legal and ethical standards.</li>
            </ol>

            <div className="mt-8">
              <p className="font-semibold text-slate-900 mb-3">Definitions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Bribe:</strong> Anything of value (cash, gifts, entertainment, or other courtesies) offered to influence decisions or gain/retain a business advantage.</li>
              </ul>
            </div>

            <div className="mt-8">
              <p className="font-semibold text-slate-900 mb-3">Prohibited Actions:</p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>Offering, promising, or giving payments, gifts, or hospitality to secure an improper business advantage.</li>
                <li>Offering payments, gifts, or hospitality to government officials to influence or expedite actions.</li>
                <li>Accepting payments or gifts from third parties that could create an improper advantage.</li>
                <li>Inducing others to violate this policy.</li>
                <li>Threatening or retaliating against employees who refuse to commit bribery or report concerns.</li>
                <li>Giving or accepting gifts that could reasonably be perceived as a contravention of this policy or applicable law.</li>
                <li>Engaging in any activity that may lead to a breach of this policy.</li>
              </ul>
            </div>

            <p className="mt-8">
              All reasonable suspicions of bribery or corruption must be reported following the Whistleblowing Procedure. Failure to report such acts may result in disciplinary action.
            </p>
          </div>
        </div>
      </section>

      {/* Responsible Recruitment */}
      <section className="py-16 px-4 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-blue-600">Responsible Recruitment</h2>
          
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Sandiya Human Resources Pvt. Ltd. is committed to ensuring that all workers within our operations and supply chains are recruited ethically, professionally, and transparently. This commitment extends to all stages of employment, including application, recruitment, and subsequent employment or placement, safeguarding the rights and well-being of every worker.
            </p>

            <p className="font-semibold text-slate-900">We expect the same high standards of ethical recruitment from all our business partners, including:</p>
            
            <ol className="list-decimal list-inside space-y-4 ml-4">
              <li>
                <strong>Suppliers and Service Providers:</strong> Organizations providing services to workers, such as health centers, insurance providers, visa processing authorities, travel agencies, skills certification/training providers, dormitory or accommodation providers, translation/interpretation agencies, and any other relevant partners.
              </li>
              <li>
                <strong>Labour Users/Employer Clients:</strong> We actively monitor and ensure that all our clients adhere to these responsible recruitment standards throughout their engagement with workers.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
