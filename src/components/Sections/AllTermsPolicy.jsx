import {
  Clock,
  Calendar,
  RefreshCw,
  Mail,
  CalendarCheck,
  Hourglass,
  AlertTriangle,
  User,
  Video,
  GraduationCap,
  Award,
  Eye,
  Edit,
  Trash2,
  PauseCircle,
  Download,
  Ban,
  ChartLine,
  CreditCard,
  Gift,
  Shield,
  Bell,
  BarChart3,
  Lock,
  UserCheck,
  MessageCircle,
  Percent,
  PlayCircle,
  Receipt,
  Share,
  UserCircle2,
  Users2,
  Handshake,
  Gavel,
  Briefcase,
  Lightbulb,
  Users,
  ListChecks,
  LogIn,
  UserPlusIcon,
  ArrowBigRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Terms = () => {
  return (
    <div className="pt-100">
      <section className="py-5 bg-light main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">Terms & Conditions</h1>
                <p className="text-muted">Last updated on Oct 6th 2025</p>
                <div
                  className="border-bottom mx-auto"
                  style={{ width: "400px", height: "2px" }}
                ></div>
              </div>

              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-5">
                  <p>
                    For the purpose of these Terms and Conditions, the term{" "}
                    <strong>"we", "us", "our"</strong> used anywhere on this
                    page shall mean{" "}
                    <strong>DESIGN CAREER METRICS PRIVATE LIMITED</strong>,
                    whose registered/operational office is #407, #409
                    Jainsadguru Image Capital Park, 501-D, VIP Hills, Silicon
                    Valley, Madhapur,Hyderbad, Telangana 500081 .{" "}
                    <strong>"you", “your”, "user", “visitor”</strong> shall mean
                    any natural or legal person who is visiting our website
                    and/or agreed to purchase from us.
                  </p>

                  <p>
                    Your use of the website and/or purchase from us are governed
                    by following Terms and Conditions:
                  </p>

                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <strong>1.</strong> The content of the pages of this
                      website is subject to change without notice.
                    </li>
                    <li className="mb-3">
                      <strong>2.</strong> Neither we nor any third parties
                      provide any warranty or guarantee as to the accuracy,
                      timeliness, performance, completeness or suitability of
                      the information and materials found or offered on this
                      website for any particular purpose. You acknowledge that
                      such information and materials may contain inaccuracies or
                      errors and we expressly exclude liability for any such
                      inaccuracies or errors to the fullest extent permitted by
                      law.
                    </li>
                    <li className="mb-3">
                      <strong>3.</strong> Your use of any information or
                      materials on our website and/or product pages is entirely
                      at your own risk, for which we shall not be liable. It
                      shall be your own responsibility to ensure that any
                      products, services or information available through our
                      website and/or product pages meet your specific
                      requirements.
                    </li>
                    <li className="mb-3">
                      <strong>4.</strong> Our website contains material which is
                      owned by or licensed to us. This material includes, but is
                      not limited to, the design, layout, look, appearance and
                      graphics. Reproduction is prohibited other than in
                      accordance with the copyright notice, which forms part of
                      these terms and conditions.
                    </li>
                    <li className="mb-3">
                      <strong>5.</strong> All trademarks reproduced in our
                      website which are not the property of, or licensed to, the
                      operator are acknowledged on the website.
                    </li>
                    <li className="mb-3">
                      <strong>6.</strong> Unauthorized use of information
                      provided by us shall give rise to a claim for damages
                      and/or be a criminal offense.
                    </li>
                    <li className="mb-3">
                      <strong>7.</strong> From time to time our website may also
                      include links to other websites. These links are provided
                      for your convenience to provide further information.
                    </li>
                    <li className="mb-3">
                      <strong>8.</strong> You may not create a link to our
                      website from another website or document without DESIGN
                      CAREER METRICS PRIVATE LIMITED’s prior written consent.
                    </li>
                    <li className="mb-3">
                      <strong>9.</strong> Any dispute arising out of use of our
                      website and/or purchase with us and/or any engagement with
                      us is subject to the laws of India.
                    </li>
                    <li className="mb-3">
                      <strong>10.</strong> We shall be under no liability
                      whatsoever in respect of any loss or damage arising
                      directly or indirectly out of the decline of authorization
                      for any Transaction, on Account of the Cardholder having
                      exceeded the preset limit mutually agreed by us with our
                      acquiring bank from time to time.
                    </li>
                  </ul>

                  <div className="mt-4 p-4 bg-dark text-white rounded">
                    <p className="mb-0 text-center fw-medium">
                      By using our website and services, you acknowledge that
                      you have read, understood, and agree to be bound by these
                      Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Privacy = () => {
  return (
    <div className="pt-100">
      <section className="py-5 bg-light main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">Privacy Policy</h1>
                <p className="lead text-muted">Last updated: Oct 6th, 2025</p>
                <div
                  className="border-bottom mx-auto"
                  style={{ width: "100px", height: "2px" }}
                ></div>
              </div>

              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-5">
                  <div className="alert alert-light border mb-4">
                    <p className="mb-0 fw-medium">
                      At <strong>Design Career Metrics Private Limited</strong>,
                      we are committed to safeguarding your privacy and
                      protecting your personal information. This Privacy Policy
                      explains how we collect, use, disclose, and secure your
                      data in compliance with applicable laws including the{" "}
                      <strong>Indian IT Act</strong> and{" "}
                      <strong>GDPR (General Data Protection Regulation)</strong>.
                    </p>
                  </div>

                  {/* Information We Collect */}
                  <div className="col-12 mb-5">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Information We Collect
                    </h4>
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <div className="text-center p-4 bg-white border rounded h-100">
                          <UserCircle2 size={40} />
                          <h6 className="fw-bold">Personal Information</h6>
                          <small className="text-muted">
                            Name, email, phone number, billing address,
                            professional background, educational history
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4">
                        <div className="text-center p-4 bg-white border rounded h-100">
                          <CreditCard size={40} />
                          <h6 className="fw-bold">Financial Information</h6>
                          <small className="text-muted">
                            Processed via secure payment gateways (e.g. Razorpay) —
                            includes billing history, subscription status, and
                            transaction records
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4">
                        <div className="text-center p-4 bg-white border rounded h-100">
                          <ChartLine size={40} />
                          <h6 className="fw-bold">Technical Data</h6>
                          <small className="text-muted">
                            IP address, device details, browser type, session
                            duration, and interaction patterns
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How We Use */}
                  <div className="col-12 mb-5">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      How We Use Your Information
                    </h4>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <div className="mx-3">
                            <PlayCircle className="text-primary" size={20} />
                          </div>
                          <div>
                            <strong>Service Delivery</strong>
                            <p className="small text-muted mb-0">
                              Provide access to courses, live sessions, and
                              learning materials
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <div className="mx-3">
                            <Shield className="text-success" size={20} />
                          </div>
                          <div>
                            <strong>Payment Processing</strong>
                            <p className="small text-muted mb-0">
                              Process transactions, manage subscriptions, and
                              handle billing
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <div className="mx-3">
                            <Bell className="text-warning" size={20} />
                          </div>
                          <div>
                            <strong>Communication</strong>
                            <p className="small text-muted mb-0">
                              Send important updates, course schedules, and
                              announcements
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start">
                          <div className="mx-3">
                            <BarChart3 className="text-info" size={20} />
                          </div>
                          <div>
                            <strong>Platform Improvement</strong>
                            <p className="small text-muted mb-0">
                              Analyze data to improve performance and features
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sharing */}
                  <div className="col-12 mb-5">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Data Sharing & Disclosure
                    </h4>
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="text-center p-4 border rounded h-100">
                          <Ban className="text-danger" size={32} />
                          <h6 className="fw-bold mt-2">
                            No Sale of Data
                          </h6>
                          <small className="text-muted">
                            We never sell or trade your personal data for
                            marketing purposes
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-4 border rounded h-100">
                          <Handshake className="text-warning" size={32} />
                          <h6 className="fw-bold mt-2">
                            Trusted Providers
                          </h6>
                          <small className="text-muted">
                            Shared only with secure partners like payment
                            processors (Razorpay), hosting, and analytics tools
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-4 border rounded h-100">
                          <Gavel className="text-info" size={32} />
                          <h6 className="fw-bold mt-2">Legal Compliance</h6>
                          <small className="text-muted">
                            Disclosed when required by law or to protect our
                            rights
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Sections */}
                  <div className="col-12 mb-5">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Data Retention & Security
                    </h4>
                    <p className="small text-muted">
                      We retain personal data only as long as necessary for the
                      purposes stated in this policy. Strong security measures,
                      including SSL encryption and access controls, are in place
                      to protect your information. However, no system is 100%
                      secure, and we continually update practices against
                      threats.
                    </p>
                  </div>

                  <div className="col-12 mb-5">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Your Rights
                    </h4>
                    <p className="small text-muted">
                      You have the right to access, correct, delete, or restrict
                      use of your personal data. You may also request data
                      portability or object to certain processing. Please
                      contact us for assistance.
                    </p>
                  </div>

                  <div className="col-12 mb-4">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Children's Privacy
                    </h4>
                    <p className="small text-muted">
                      Our services are not intended for individuals under 16.
                      We do not knowingly collect data from children.
                    </p>
                  </div>

                  <div className="col-12 mb-4">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Changes to This Policy
                    </h4>
                    <p className="small text-muted">
                      We may update this Privacy Policy as needed. Updates will
                      be posted on this page with a revised “Last Updated” date.
                    </p>
                  </div>

                  <div className="col-12">
                    <h4 className="fw-bold mb-3">Contact Us</h4>
                    <p className="small text-muted">
                      For any questions regarding this Privacy Policy, please
                      contact us at{" "}
                      <a
                        href="mailto:privacy@designcareermetrics.com"
                        className="fw-bold text-decoration-none"
                      >
                        privacy@designcareermetrics.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export const Refund = () => {
  return (
    <div className="pt-100">
      <section className="py-5 bg-light main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">
                  Cancellation & Refund Policy
                </h1>
                <p className="text-muted">Last updated on Oct 6th, 2025</p>
                <div
                  className="border-bottom mx-auto"
                  style={{ width: "400px", height: "2px" }}
                ></div>
              </div>

              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-5">
                  <p>
                    At <strong>Design Career Metrics Private Limited</strong>, we are committed
                    to delivering a seamless online learning experience through
                    our digital courses, live classes, and subscription-based
                    services. As these are <strong>digital products</strong>,
                    our cancellation and refund terms differ from those for
                    physical goods.
                  </p>

                  <h4 className="fw-bold mt-4 mb-3">Cancellations</h4>
                  <ul>
                    <li>
                      Once payment is successfully processed, course enrollments
                      and subscriptions <strong>cannot be cancelled</strong>.
                    </li>
                    <li>
                      You may choose not to renew your subscription at the end
                      of the current billing cycle. No further charges will be
                      applied after the expiry of the plan.
                    </li>
                  </ul>

                  <h4 className="fw-bold mt-4 mb-3">Refunds</h4>
                  <ul>
                    <li>
                      All payments made towards digital courses, subscriptions,
                      or live sessions are <strong>non-refundable</strong>.
                    </li>
                    <li>
                      Refunds will not be issued for partially completed courses,
                      unattended live classes, or downloaded resources.
                    </li>
                    <li>
                      In case of a <strong>duplicate payment</strong>, the
                      refund will be initiated to the original payment method
                      within <strong>7–10 business days</strong>.
                    </li>
                  </ul>

                  <h4 className="fw-bold mt-4 mb-3">Access Issues</h4>
                  <p>
                    If you face technical difficulties that prevent you from
                    accessing your purchased course, please reach out to our
                    support team within <strong>48 hours</strong>. If the issue
                    is found to be on our side and cannot be resolved, a refund
                    may be considered at our discretion.
                  </p>

                  <h4 className="fw-bold mt-4 mb-3">Contact Us</h4>
                  <p>
                    For any queries related to cancellations or refunds, please
                    contact us at{" "}
                    <a
                      href="mailto:support@designcareermetrics.com"
                      className="fw-bold text-decoration-none"
                    >
                      support@designcareermetrics.com
                    </a>
                    .
                  </p>

                  <div className="mt-4 p-4 bg-dark text-white rounded text-center">
                    <p className="mb-0 fw-medium">
                      By enrolling in our courses or subscribing to our services,
                      you confirm that you have read, understood, and agreed to
                      this Cancellation & Refund Policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



export const Forums = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="display-5 fw-bold mb-3">Community Forums</h1>
              <p className="lead text-muted">
                Connect, collaborate, and learn with our community of designers
                and professionals
              </p>
              <div
                className="border-bottom mx-auto"
                style={{ width: "100px", height: "2px" }}
              ></div>
            </div>

            <div className="card shadow-sm border-0 rounded-lg">
              <div className="card-body p-5">
                <div className="alert alert-light border mb-4">
                  <p className="mb-0 fw-medium">
                    Join our vibrant community of learners, instructors, and
                    industry professionals. Share knowledge, ask questions, and
                    grow together.
                  </p>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Forum Categories
                    </h4>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="d-flex align-items-start p-4 border rounded h-100">
                          <div className="mx-3">
                            <GraduationCap className="text-primary" size={32} />
                          </div>
                          <div>
                            <h5 className="fw-bold">Learning Support</h5>
                            <p className="text-muted mb-2">
                              Get help with course content, assignments, and
                              learning challenges
                            </p>
                            <div className="d-flex text-muted small">
                              <span className="me-3">
                                <strong className="mx-1">115</strong> Topics
                              </span>
                              <span>
                                <strong className="mx-1">899</strong> Posts
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start p-4 border rounded h-100">
                          <div className="mx-3">
                            <Briefcase className="text-success" size={32} />
                          </div>
                          <div>
                            <h5 className="fw-bold">Career Discussions</h5>
                            <p className="text-muted mb-2">
                              Discuss career paths, job opportunities, and
                              industry trends
                            </p>
                            <div className="d-flex text-muted small">
                              <span className="me-3">
                                <strong className="mx-1">189</strong> Topics
                              </span>
                              <span>
                                <strong className="mx-1">856</strong> Posts
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start p-4 border rounded h-100">
                          <div className="mx-3">
                            <Lightbulb className="text-warning" size={32} />
                          </div>
                          <div>
                            <h5 className="fw-bold">Project Showcase</h5>
                            <p className="text-muted mb-2">
                              Share your work, get feedback, and showcase your
                              projects
                            </p>
                            <div className="d-flex text-muted small">
                              <span className="me-3">
                                <strong className="mx-1">156</strong> Topics
                              </span>
                              <span>
                                <strong className="mx-1">723</strong> Posts
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start p-4 border rounded h-100">
                          <div className="mx-3">
                            <Users className="text-info" size={32} />
                          </div>
                          <div>
                            <h5 className="fw-bold">Community Events</h5>
                            <p className="text-muted mb-2">
                              Information about webinars, meetups, and community
                              events
                            </p>
                            <div className="d-flex text-muted small">
                              <span className="me-3">
                                <strong className="mx-1">67</strong> Topics
                              </span>
                              <span>
                                <strong className="mx-1">234</strong> Posts
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Recent Discussions
                    </h4>
                    <div className="list-group">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            Best practices for responsive design in 2024
                          </h6>
                          <p className="mb-1 text-muted small">
                            Posted by Sarah Chen in Learning Support
                          </p>
                        </div>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            Portfolio review for junior UX designer position
                          </h6>
                          <p className="mb-1 text-muted small">
                            Posted by Mike Rodriguez in Project Showcase
                          </p>
                        </div>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">
                            Upcoming webinar: AI in Design workflows
                          </h6>
                          <p className="mb-1 text-muted small">
                            Posted by Admin in Community Events
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Forum Guidelines
                    </h4>
                    <div className="alert alert-light border">
                      <ul className="mb-0">
                        <li className="mb-2">
                          <ArrowBigRight className="mx-2" />
                          <strong>Be Respectful:</strong> Treat all community
                          members with respect and professionalism.
                        </li>
                        <li className="mb-2">
                          <ArrowBigRight className="mx-2" />
                          <strong>Stay On Topic:</strong> Keep discussions
                          relevant to the forum category.
                        </li>
                        <li className="mb-2">
                          <ArrowBigRight className="mx-2" />
                          <strong>No Spam:</strong> Commercial promotions and
                          spam content are not allowed.
                        </li>
                        <li className="mb-2">
                          <ArrowBigRight className="mx-2" />
                          <strong>Protect Privacy:</strong> Do not share
                          personal information of yourself or others.
                        </li>
                        <li>
                          <ArrowBigRight className="mx-2" />
                          <strong>Give Credit:</strong> Always credit original
                          sources when sharing content.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 bg-dark text-white rounded">
                  <h4 className="fw-bold mb-3 text-white">
                    Join the Conversation
                  </h4>
                  <p className="mb-3">
                    Ready to connect with our community? Sign in to access the
                    forums and start participating.
                  </p>
                  <Link
                    to={"/login"}
                    className="btn btn-light  fw-bold me-3 mx-3"
                  >
                    <LogIn className="mx-1" />
                    Sign In
                  </Link>
                  <Link
                    to={"/sign-up"}
                    className="btn btn-outline-light  fw-bold"
                  >
                    <UserPlusIcon className="mx-1" />
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const KnowledgeBase = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="display-5 fw-bold mb-3">Knowledge Base</h1>
              <p className="lead text-muted">
                Find answers to common questions and learn how to make the most
                of our platform
              </p>
              <div
                className="border-bottom mx-auto"
                style={{ width: "100px", height: "2px" }}
              ></div>
            </div>

            <div className="card shadow-sm border-0 rounded-lg">
              <div className="card-body p-5">
                <div className="alert alert-light border mb-4">
                  <p className="mb-0 fw-medium">
                    Welcome to our comprehensive Knowledge Base. Here you'll
                    find detailed guides, tutorials, and answers to frequently
                    asked questions about Design Career Metrics.
                  </p>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Getting Started
                    </h4>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="d-flex align-items-start p-4 border rounded h-100">
                          <div className="mx-3">
                            <UserPlusIcon className="text-primary" size={32} />
                          </div>
                          <div>
                            <h5 className="fw-bold">Account Setup</h5>
                            <p className="text-muted mb-0">
                              To get started, visit our{" "}
                              <Link
                                to={"/sign-up"}
                                className="text-decoration-none fw-bold"
                              >
                                signup page
                              </Link>
                              , fill in your details including name, email, and
                              password. Verify your email through the
                              confirmation link sent to your inbox, then
                              complete your profile setup in the dashboard.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-start p-4 border rounded h-100">
                          <div className="mx-3">
                            <PlayCircle className="text-success" size={32} />
                          </div>
                          <div>
                            <h5 className="fw-bold">First Steps</h5>
                            <p className="text-muted mb-0">
                              After signing up, navigate to the{" "}
                              <a
                                href="/courses"
                                className="text-decoration-none fw-bold"
                              >
                                courses section
                              </a>
                              , browse available courses, and enroll in your
                              preferred program. Access your learning dashboard
                              to start watching videos, complete assignments,
                              and track your progress.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Course Management
                    </h4>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <div className="text-center p-4 border rounded h-100">
                          <div className="mx-3 mb-3">
                            <Video className="text-info" size={32} />
                          </div>
                          <h6 className="fw-bold">Video Lessons</h6>
                          <p className="small text-muted mb-0">
                            Access videos from your course dashboard. Click on
                            any lesson to start watching. Your progress is
                            automatically saved, and you can resume from where
                            you left off.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-4 border rounded h-100">
                          <div className="mx-3 mb-3">
                            <ListChecks className="text-warning" size={32} />
                          </div>
                          <h6 className="fw-bold">Assignments</h6>
                          <p className="small text-muted mb-0">
                            Submit assignments through the course portal before
                            deadlines. Upload files directly or provide links to
                            your work. Receive feedback within 48 hours.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-4 border rounded h-100">
                          <div className="mx-3 mb-3">
                            <BarChart3 className="text-danger" size={32} />
                          </div>
                          <h6 className="fw-bold">Progress Tracking</h6>
                          <p className="small text-muted mb-0">
                            Monitor your progress in the analytics dashboard.
                            Track completed lessons, assignment scores, and
                            overall course completion percentage in real-time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Technical Support
                    </h4>
                    <div className="alert alert-light border">
                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="fw-bold text-dark">
                            Browser Compatibility
                          </h5>
                          <p className="small text-muted">
                            For optimal performance, use Chrome, Firefox, or
                            Safari latest versions. Clear your browser cache
                            regularly and ensure JavaScript is enabled.
                          </p>
                        </div>
                        <div className="col-md-6">
                          <h5 className="fw-bold text-dark">Mobile Access</h5>
                          <p className="small text-muted">
                            Download our mobile app from App Store or Google
                            Play. All course features are available on mobile
                            with offline viewing capability.
                          </p>
                        </div>
                        <div className="col-md-6 my-4">
                          <h5 className="fw-bold text-dark">Video Playback</h5>
                          <p className="small text-muted">
                            Ensure stable internet connection (min 5Mbps). For
                            playback issues, try lowering video quality or using
                            a different browser.
                          </p>
                        </div>
                        <div className="col-md-6 my-4">
                          <h5 className="fw-bold text-dark">Download Issues</h5>
                          <p className="small text-muted">
                            Check your storage space and internet connection. If
                            downloads fail, try again after clearing browser
                            cache or using incognito mode.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">
                      Frequently Asked Questions
                    </h4>
                    <div className="accordion" id="kbAccordion">
                      <div className="card">
                        <div className="card-header" id="headingOne">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link w-100 text-start text-decoration-none"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              How do I reset my password?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#kbAccordion"
                        >
                          <div className="card-body">
                            You can reset your password by clicking on "Forgot
                            Password" on the login page. Follow the instructions
                            sent to your email to create a new password.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header" id="headingTwo">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link w-100 text-start text-decoration-none collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Can I download course materials for offline use?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#kbAccordion"
                        >
                          <div className="card-body">
                            Yes, most course materials are available for
                            download. Look for the download icon next to each
                            resource. Some materials may have restrictions based
                            on the course provider's policies.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center p-4 bg-dark text-white rounded">
                  <h4 className="fw-bold mb-3 text-white">Still Need Help?</h4>
                  <p className="mb-3">
                    Can't find what you're looking for? Our support team is here
                    to help you.
                  </p>
                  <Link
                    to={"/contact-us"}
                    className="btn btn-light  fw-bold me-3"
                  >
                    <Mail className="mx-1" />
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AffiliatesProgram = () => {
  return (
    <div className="pt-100">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3">Affiliates Program</h1>
                <p className="lead text-muted">
                  Earn commissions by referring students to Design Career
                  Metrics
                </p>
                <div
                  className="border-bottom mx-auto"
                  style={{ width: "100px", height: "2px" }}
                ></div>
              </div>

              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body p-5">
                  <div className="alert alert-light border mb-4">
                    <p className="mb-0 fw-medium">
                      Join our Affiliates Program and earn competitive
                      commissions for every student you refer. Help others
                      advance their design careers while growing your income.
                    </p>
                  </div>

                  <div className="row mb-5">
                    <div className="col-12">
                      <h4 className="fw-bold mb-4 border-bottom pb-2">
                        Program Benefits
                      </h4>
                      <div className="row g-4">
                        <div className="col-md-4">
                          <div className="text-center p-4 border rounded h-100">
                            <Percent />

                            <h5 className="fw-bold">Competitive Commissions</h5>
                            <p className="text-muted">
                              Earn up to 20% commission on every successful
                              referral
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center p-4 border rounded h-100">
                            <ChartLine />

                            <h5 className="fw-bold">Real-time Tracking</h5>
                            <p className="text-muted">
                              Monitor your referrals and earnings with our
                              dashboard
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center p-4 border rounded h-100">
                            <Gift />

                            <h5 className="fw-bold">Performance Bonuses</h5>
                            <p className="text-muted">
                              Additional bonuses for top-performing affiliates
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-12">
                      <h4 className="fw-bold mb-4 border-bottom pb-2">
                        Commission Structure
                      </h4>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead className="table-light">
                            <tr>
                              <th>Program Tier</th>
                              <th>Commission Rate</th>
                              <th>Requirements</th>
                              <th>Payout Frequency</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Starter</td>
                              <td>10%</td>
                              <td>1-10 referrals/month</td>
                              <td>Monthly</td>
                            </tr>
                            <tr>
                              <td>Professional</td>
                              <td>15%</td>
                              <td>11-25 referrals/month</td>
                              <td>Bi-weekly</td>
                            </tr>
                            <tr>
                              <td>Elite</td>
                              <td>20%</td>
                              <td>26+ referrals/month</td>
                              <td>Weekly</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5">
                    <div className="col-12">
                      <h4 className="fw-bold mb-4 border-bottom pb-2">
                        How It Works
                      </h4>
                      <div className="row g-4">
                        <div className="col-md-3">
                          <div className="text-center">
                            <div
                              className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                              style={{ width: "60px", height: "60px" }}
                            >
                              <span className="fw-bold">1</span>
                            </div>
                            <h6>Sign Up</h6>
                            <p className="small text-muted">
                              Register for our affiliates program
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <div
                              className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                              style={{ width: "60px", height: "60px" }}
                            >
                              <span className="fw-bold">2</span>
                            </div>
                            <h6>Get Links</h6>
                            <p className="small text-muted">
                              Access your unique referral links
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <div
                              className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                              style={{ width: "60px", height: "60px" }}
                            >
                              <span className="fw-bold">3</span>
                            </div>
                            <h6>Share & Promote</h6>
                            <p className="small text-muted">
                              Share your links with your audience
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <div
                              className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                              style={{ width: "60px", height: "60px" }}
                            >
                              <span className="fw-bold">4</span>
                            </div>
                            <h6>Earn Commissions</h6>
                            <p className="small text-muted">
                              Get paid for every successful referral
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-12">
                      <h4 className="fw-bold mb-4 border-bottom pb-2">FAQ</h4>
                      <div className="accordion" id="affiliatesAccordion">
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link w-100 text-start text-decoration-none"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#affiliateOne"
                                aria-expanded="true"
                                aria-controls="affiliateOne"
                              >
                                How much can I earn as an affiliate?
                              </button>
                            </h5>
                          </div>
                          <div
                            id="affiliateOne"
                            className="collapse show"
                            data-bs-parent="#affiliatesAccordion"
                          >
                            <div className="card-body">
                              Our top affiliates earn over 5,000 Rs per month.
                              Earnings depend on your audience size, engagement,
                              and the number of successful referrals. With our
                              tiered commission structure, the more you refer,
                              the higher your commission rate.
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <h5 className="mb-0">
                              <button
                                className="btn btn-link w-100 text-start text-decoration-none collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#affiliateTwo"
                                aria-expanded="false"
                                aria-controls="affiliateTwo"
                              >
                                When do I get paid?
                              </button>
                            </h5>
                          </div>
                          <div
                            id="affiliateTwo"
                            className="collapse"
                            data-bs-parent="#affiliatesAccordion"
                          >
                            <div className="card-body">
                              Payouts are processed based on your tier: Starter
                              (monthly), Professional (bi-weekly), and Elite
                              (weekly). All payments are made via Razorpay or
                              bank transfer. There's a 30-day refund period
                              before commissions are released.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-primary text-white rounded">
                    <h4 className="fw-bold mb-3 text-white">
                      Ready to Start Earning?
                    </h4>
                    <p className="mb-3">
                      Join thousands of successful affiliates promoting Design
                      Career Metrics
                    </p>

                    <Link
                      to={"/contact-us"}
                      className="btn btn-outline-light  fw-bold"
                    >
                      <Mail className="mx-2" />
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
