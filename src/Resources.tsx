import React from 'react';
import { Book, Video, FileText, Phone, ExternalLink, Download, Scale, Shield, AlertCircle } from 'lucide-react';

interface ResourcesProps {
  theme: string;
}

const Resources: React.FC<ResourcesProps> = ({ theme }) => {
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  const legalAidOrganizations = [
    {
      name: 'ACLU (American Civil Liberties Union)',
      description: 'Defending individual rights and liberties guaranteed by the Constitution',
      phone: '(212) 549-2500',
      website: 'https://www.aclu.org',
      services: ['Constitutional Rights', 'Free Speech', 'Privacy Rights', 'Criminal Justice Reform']
    },
    {
      name: 'National Lawyers Guild',
      description: 'Progressive bar association providing legal support for social justice movements',
      phone: '(212) 679-5100',
      website: 'https://www.nlg.org',
      services: ['Protest Legal Support', 'Know Your Rights', 'Legal Observers', 'Mass Defense']
    },
    {
      name: 'Electronic Frontier Foundation (EFF)',
      description: 'Defending civil liberties in the digital world',
      phone: '(415) 436-9333',
      website: 'https://www.eff.org',
      services: ['Digital Privacy', 'Free Speech Online', 'Surveillance', 'Copyright']
    },
    {
      name: 'Legal Aid Society',
      description: 'Free legal services for low-income individuals',
      phone: '(212) 577-3300',
      website: 'https://www.legalaidnyc.org',
      services: ['Criminal Defense', 'Civil Rights', 'Family Law', 'Housing']
    },
    {
      name: 'National Police Accountability Project',
      description: 'Protecting civil rights through litigation and advocacy',
      phone: '(202) 232-8600',
      website: 'https://www.nlg-npap.org',
      services: ['Police Misconduct', 'Excessive Force', 'False Arrest', 'Civil Rights Violations']
    },
    {
      name: 'Reporters Committee for Freedom of the Press',
      description: 'Legal resources and support for journalists',
      phone: '(202) 795-9300',
      website: 'https://www.rcfp.org',
      services: ['Press Freedom', 'FOIA Assistance', 'Shield Laws', 'Access to Courts']
    }
  ];

  const educationalResources = [
    {
      title: 'Know Your Rights: Police Encounters',
      type: 'Guide',
      description: 'Comprehensive guide on your constitutional rights during police interactions',
      icon: Shield,
      topics: ['Traffic Stops', 'Street Encounters', 'Home Visits', 'Arrest Procedures'],
      downloadUrl: '#'
    },
    {
      title: 'FOIA Request Masterclass',
      type: 'Video Series',
      description: 'Step-by-step video tutorials on filing effective FOIA requests',
      icon: Video,
      topics: ['Writing Requests', 'Appeals Process', 'Fee Waivers', 'Exemptions'],
      downloadUrl: '#'
    },
    {
      title: 'First Amendment Auditing Guide',
      type: 'eBook',
      description: 'Complete guide to conducting First Amendment audits safely and legally',
      icon: Book,
      topics: ['Public Photography', 'Recording Rights', 'Safety Protocols', 'Legal Boundaries'],
      downloadUrl: '#'
    },
    {
      title: 'Civil Rights Litigation Basics',
      type: 'Course',
      description: 'Introduction to filing civil rights lawsuits under Section 1983',
      icon: Scale,
      topics: ['Legal Standards', 'Qualified Immunity', 'Damages', 'Procedure'],
      downloadUrl: '#'
    }
  ];

  const videoTutorials = [
    {
      title: 'How to File a FOIA Request',
      duration: '12:34',
      views: '45K',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop',
      description: 'Learn the complete process of filing effective FOIA requests'
    },
    {
      title: 'Your Rights During Police Stops',
      duration: '18:22',
      views: '128K',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop',
      description: 'What to say and do when stopped by police'
    },
    {
      title: 'Recording Police: Legal Guidelines',
      duration: '15:47',
      views: '89K',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop',
      description: 'Understanding your First Amendment right to record'
    },
    {
      title: 'Filing a Civil Rights Complaint',
      duration: '22:15',
      views: '34K',
      thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=225&fit=crop',
      description: 'Step-by-step guide to filing complaints against government agencies'
    }
  ];

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      type: 'Crisis'
    },
    {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: '24/7 support for domestic violence victims',
      type: 'Crisis'
    },
    {
      name: 'Legal Aid Hotline',
      number: '211',
      description: 'Connect to local legal aid services',
      type: 'Legal'
    },
    {
      name: 'ACLU Legal Intake',
      number: '1-877-634-5454',
      description: 'Report civil rights violations',
      type: 'Legal'
    },
    {
      name: 'FBI Civil Rights Division',
      number: '1-202-514-4609',
      description: 'Report federal civil rights violations',
      type: 'Legal'
    },
    {
      name: 'National Lawyers Guild Legal Hotline',
      number: '(415) 285-1011',
      description: 'Legal support for activists and protesters',
      type: 'Legal'
    }
  ];

  const faqs = [
    {
      question: 'Do I have to show ID to police?',
      answer: 'It depends on your state. In "Stop and ID" states, you must provide your name (and sometimes address) when lawfully detained. In other states, you generally only need to identify yourself if arrested. Check your state\'s specific laws in the State Laws tab.'
    },
    {
      question: 'Can I record police officers?',
      answer: 'Yes. The First Amendment protects your right to record police officers performing their duties in public. However, you cannot interfere with their work, and some states require all-party consent for audio recording of private conversations (though this typically doesn\'t apply to on-duty officers in public).'
    },
    {
      question: 'What should I do if my FOIA request is denied?',
      answer: 'You have the right to appeal. The denial letter should explain the exemptions claimed and provide appeal procedures. File an administrative appeal within the specified timeframe (usually 30-90 days). If the appeal is denied, you may file a lawsuit in federal court.'
    },
    {
      question: 'How long does a FOIA request take?',
      answer: 'By law, agencies must respond within 20 business days (federal) or according to state law timeframes (typically 3-30 days). However, agencies often claim extensions. If they miss deadlines, you can file an appeal or lawsuit for unreasonable delay.'
    },
    {
      question: 'Can police search my phone without a warrant?',
      answer: 'No. The Supreme Court ruled in Riley v. California (2014) that police generally need a warrant to search your phone. However, they may seize it to prevent evidence destruction while obtaining a warrant. Never consent to a search and clearly state you do not consent.'
    },
    {
      question: 'What is qualified immunity?',
      answer: 'Qualified immunity is a legal doctrine that protects government officials from civil liability unless they violated "clearly established" constitutional rights. It\'s a major barrier to civil rights lawsuits and is currently subject to reform efforts.'
    },
    {
      question: 'How do I file a complaint against a police officer?',
      answer: 'Contact the police department\'s Internal Affairs division or civilian oversight board. File a written complaint with specific details, dates, and officer information. Also consider filing a complaint with your state attorney general and the FBI Civil Rights Division for serious violations.'
    },
    {
      question: 'What should I say if police want to question me?',
      answer: 'You have the right to remain silent. Clearly state: "I am exercising my Fifth Amendment right to remain silent. I want to speak to a lawyer." Then stop talking. Anything you say can be used against you, even if you think it helps your case.'
    }
  ];

  const caseStudies = [
    {
      title: 'Successful FOIA Request: Police Body Camera Footage',
      outcome: 'Victory',
      description: 'Activist obtained body camera footage showing police misconduct after initial denial, leading to officer discipline and policy changes.',
      lessons: ['Persistence pays off', 'Appeal denials', 'Cite specific exemptions', 'Use media pressure']
    },
    {
      title: 'First Amendment Audit: Public Building Access',
      outcome: 'Victory',
      description: 'Photographer successfully defended right to photograph public building after false arrest, resulting in $50,000 settlement.',
      lessons: ['Know your rights', 'Record everything', 'Stay calm', 'Get legal representation']
    },
    {
      title: 'Civil Rights Lawsuit: Excessive Force',
      outcome: 'Settlement',
      description: 'Victim of police brutality secured $250,000 settlement after filing Section 1983 lawsuit with video evidence.',
      lessons: ['Document injuries', 'Preserve evidence', 'File quickly', 'Expert witnesses matter']
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Civil Rights Resources</h1>
        <p className="text-xl text-gray-400">
          Comprehensive guides, legal resources, and support for protecting your constitutional rights
        </p>
      </div>

      {/* Emergency Contacts */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Phone className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl font-bold">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${borderColor} hover:border-blue-500 transition-all card-hover`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  contact.type === 'Crisis' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {contact.type}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{contact.name}</h3>
              <p className="text-2xl font-bold text-blue-400 mb-2">{contact.number}</p>
              <p className="text-sm text-gray-400">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Aid Organizations */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Scale className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl font-bold">Legal Aid Organizations</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {legalAidOrganizations.map((org, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg border ${borderColor} hover:border-blue-500 transition-all card-hover`}
            >
              <h3 className="text-xl font-bold mb-2">{org.name}</h3>
              <p className={`text-sm ${textColor} mb-4`}>{org.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>{org.phone}</span>
                </div>
                <a
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{org.website}</span>
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {org.services.map((service, sidx) => (
                  <span
                    key={sidx}
                    className="text-xs px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-400 rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Resources */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Book className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-bold">Educational Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationalResources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-lg border ${borderColor} hover:border-purple-500 transition-all card-hover`}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{resource.title}</h3>
                      <span className="text-xs px-2 py-1 bg-purple-500 bg-opacity-20 text-purple-400 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <p className={`text-sm ${textColor} mb-4`}>{resource.description}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold">Topics Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.topics.map((topic, tidx) => (
                      <span
                        key={tidx}
                        className="text-xs px-2 py-1 bg-gray-700 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Download Resource</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Tutorials */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Video className="w-8 h-8 text-green-500" />
          <h2 className="text-2xl font-bold">Video Tutorials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTutorials.map((video, idx) => (
            <div
              key={idx}
              className={`rounded-lg border ${borderColor} overflow-hidden hover:border-green-500 transition-all card-hover cursor-pointer`}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{video.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{video.description}</p>
                <p className="text-xs text-gray-500">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <AlertCircle className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className={`p-4 rounded-lg border ${borderColor} hover:border-yellow-500 transition-all`}
            >
              <summary className="font-semibold cursor-pointer flex items-center justify-between">
                {faq.question}
                <span className="text-yellow-500">▼</span>
              </summary>
              <p className={`mt-3 text-sm ${textColor} leading-relaxed`}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold">Case Studies & Success Stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg border ${borderColor} hover:border-orange-500 transition-all card-hover`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{study.title}</h3>
                <span className="text-xs px-2 py-1 bg-green-500 text-white rounded font-semibold">
                  {study.outcome}
                </span>
              </div>
              <p className={`text-sm ${textColor} mb-4`}>{study.description}</p>
              <div>
                <p className="text-sm font-semibold mb-2">Key Lessons:</p>
                <ul className="space-y-1">
                  {study.lessons.map((lesson, lidx) => (
                    <li key={lidx} className="text-sm flex items-start space-x-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Downloadable Guides */}
      <div className={`${cardBg} rounded-lg shadow-xl p-6 border ${borderColor}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Download className="w-8 h-8 text-cyan-500" />
          <h2 className="text-2xl font-bold">Downloadable Guides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Know Your Rights Pocket Guide',
            'FOIA Request Templates',
            'Police Encounter Checklist',
            'Civil Rights Complaint Form',
            'First Amendment Audit Guide',
            'Recording Laws by State',
            'Legal Self-Defense Handbook',
            'Protest Safety Guide'
          ].map((guide, idx) => (
            <button
              key={idx}
              className="p-4 rounded-lg border border-cyan-500 hover:bg-cyan-500 hover:bg-opacity-10 transition-all text-left flex items-center space-x-3"
            >
              <Download className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">{guide}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;