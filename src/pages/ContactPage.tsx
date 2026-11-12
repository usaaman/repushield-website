import React from 'react'
import { Mail, MessageCircle, Phone, Clock, Send } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'

export const ContactPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <Container size="md">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-xs font-semibold">
              <Phone className="w-4 h-4" />
              <span>Direct Support</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Get in Touch with RepuShield
            </h1>
            <p className="text-secondary text-base leading-relaxed">
              Have questions about an eligible Google review violation? Reach out directly via WhatsApp or submit your inquiry for a prompt evaluation.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/923406523353"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-600">WhatsApp Chat</p>
                <p className="text-sm font-semibold text-navy group-hover:text-[#1da851] transition-colors">+92 340 6523353</p>
                <p className="text-xs text-muted mt-0.5">Fastest response for urgent cases</p>
              </div>
            </a>

            <a
              href="mailto:usamahameedahmadani@gmail.com"
              className="p-5 rounded-2xl bg-ocean/10 border border-ocean/20 hover:border-ocean/40 transition-colors flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-ocean text-white flex items-center justify-center shrink-0 shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-600">Official Email</p>
                <p className="text-sm font-semibold text-navy group-hover:text-ocean transition-colors break-all">usamahameedahmadani@gmail.com</p>
                <p className="text-xs text-muted mt-0.5">For detailed dossiers & queries</p>
              </div>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-bg-soft border border-slate-200 text-xs text-secondary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal" />
              <span>Typical initial response time: 2–6 hours</span>
            </div>
            <span className="font-semibold text-navy">USA • Canada • Pakistan</span>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button variant="primary" to="/services">
              <span>View Services</span>
            </Button>
            <Button variant="whatsapp" href="https://wa.me/923406523353" isExternal>
              <Send className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

