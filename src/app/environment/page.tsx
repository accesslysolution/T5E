export default function EnvironmentPage() {
  const documents = [
    {
      title: "Post EC Compliance Report (Oct 2025 - Mar 2026)",
      url: "/compliance-report.pdf",
    },
    {
      title: "EC Letter - Arihant Buildcon",
      url: "/ec-letter.pdf",
    },
  ];

  return (
    <main className="min-h-screen bg-[#1C2B1E] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-white font-playfair mb-12 text-center">
          Environment Compliance
        </h1>

        <div className="grid gap-12">
          {documents.map((doc, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h2 className="text-[#C9A84C] text-xl font-medium tracking-wide">
                {doc.title}
              </h2>
              
              <div className="w-full h-[600px] bg-white rounded-lg shadow-xl overflow-hidden">
                {/* #toolbar=0 hides the download/print buttons in many browsers */}
                <iframe
                  src={`${doc.url}#toolbar=0`}
                  className="w-full h-full"
                  title={doc.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}