import React from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Users, FileText, Mail } from 'lucide-react';

const Privacy = () => {
  const lastUpdated = 'February 4, 2026';

  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you book an appointment or contact us, we collect personal information including your name, email address, phone number, date of birth, and address. For treatment purposes, we also collect health information including medical history, current symptoms, and treatment records.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'We automatically collect certain information when you visit our website, including your IP address, browser type, device information, and pages visited. This helps us improve our website and services.'
        }
      ]
    },
    {
      icon: Users,
      title: 'How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your personal and health information to provide physiotherapy services, including assessment, treatment planning, and ongoing care. This includes communicating with you about appointments, treatment plans, and follow-up care.'
        },
        {
          subtitle: 'Administrative Purposes',
          text: 'Your information is used for scheduling appointments, billing, insurance claims, and maintaining accurate patient records as required by Australian healthcare regulations.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send appointment reminders, health education materials, and updates about our services. You can opt-out of non-essential communications at any time.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'Information Sharing and Disclosure',
      content: [
        {
          subtitle: 'Healthcare Providers',
          text: 'We may share your information with other healthcare providers involved in your care, such as your GP or specialists, but only with your consent or as required by law.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information when required by law, court order, or other legal process, or to protect the rights, property, or safety of AlphaCare Physiotherapy, our patients, or others.'
        },
        {
          subtitle: 'Third-Party Service Providers',
          text: 'We work with trusted third-party service providers for booking systems, payment processing, and email communications. These providers are bound by strict confidentiality agreements and only access information necessary to perform their services.'
        }
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement industry-standard security measures to protect your personal and health information, including encryption, secure servers, and access controls. Our staff receive regular training on privacy and security protocols.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your health records for a minimum of 7 years as required by Australian healthcare regulations. Personal information used for marketing purposes is retained only as long as necessary or until you request deletion.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access your personal and health information and request corrections if information is inaccurate or incomplete. Contact us to request access to your records.'
        },
        {
          subtitle: 'Privacy Complaints',
          text: 'If you have concerns about how we handle your information, you can lodge a complaint with us. If you\'re not satisfied with our response, you can contact the Office of the Australian Information Commissioner (OAIC).'
        },
        {
          subtitle: 'Withdrawal of Consent',
          text: 'You may withdraw your consent for certain uses of your information at any time, though this may affect our ability to provide services.'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - AlphaCare Physiotherapy</title>
        <meta
          name="description"
          content="Privacy Policy for AlphaCare Physiotherapy. Learn how we collect, use, and protect your personal and health information in compliance with Australian privacy laws."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://alphacarephysio.com.au/privacy" />
      </Helmet>

      <div className="bg-gradient-to-br from-physio-neutral-50 to-white min-h-screen">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-physio-blue-dark to-physio-teal py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-white/90 mb-4">
                Your privacy and the security of your health information are our top priorities
              </p>
              <p className="text-white/80 text-sm">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <p className="text-lg text-physio-neutral-700 leading-relaxed mb-6">
                  At AlphaCare Physiotherapy, we are committed to protecting your privacy and handling your personal and health information responsibly. This Privacy Policy explains how we collect, use, store, and protect your information in accordance with the Australian Privacy Principles (APPs) under the Privacy Act 1988 and other applicable laws.
                </p>
                <p className="text-lg text-physio-neutral-700 leading-relaxed">
                  By using our services, you consent to the collection and use of your information as described in this policy. If you have any questions or concerns, please don't hesitate to contact us.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        {sections.map((section, index) => (
          <section key={index} className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-physio-teal to-physio-blue-light rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-physio-neutral-900">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-xl font-semibold text-physio-neutral-800 mb-3">
                          {item.subtitle}
                        </h3>
                        <p className="text-physio-neutral-700 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Cookies Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-physio-green to-physio-teal rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-physio-neutral-900">
                    Cookies and Tracking Technologies
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-physio-neutral-800 mb-3">
                      How We Use Cookies
                    </h3>
                    <p className="text-physio-neutral-700 leading-relaxed">
                      Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. Cookies are small text files stored on your device that help us remember your preferences and improve our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-physio-neutral-800 mb-3">
                      Managing Cookies
                    </h3>
                    <p className="text-physio-neutral-700 leading-relaxed">
                      You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. However, disabling cookies may affect your ability to use certain features of our website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl md:text-3xl font-bold text-physio-neutral-900 mb-6">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-physio-neutral-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or for other operational reasons. We will notify you of any significant changes by posting the updated policy on our website with a new "Last Updated" date.
                </p>
                <p className="text-physio-neutral-700 leading-relaxed">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-physio-teal to-physio-blue-light rounded-2xl shadow-xl p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Contact Us About Privacy
                  </h2>
                </div>

                <p className="text-white/90 leading-relaxed mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:
                </p>

                <div className="space-y-3 mb-8">
                  <p className="text-white/90">
                    <span className="font-semibold">AlphaCare Physiotherapy</span>
                  </p>
                  <p className="text-white/90">
                    855 Marion Rd, Mitchell Park, SA 5043
                  </p>
                  <p className="text-white/90">
                    Phone: <a href="tel:1300433233" className="underline hover:text-white transition-colors">1300 433 233</a>
                  </p>
                  <p className="text-white/90">
                    Email: <a href="mailto:admin@alphacarephysio.com.au" className="underline hover:text-white transition-colors">admin@alphacarephysio.com.au</a>
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-block bg-white text-physio-teal hover:bg-physio-neutral-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Privacy;