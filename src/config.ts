// Substitua os dados abaixo antes da publicação. O número deve conter DDI + DDD, apenas dígitos.
export const siteConfig = {
  companyName: 'JS Venezianas',
  whatsappNumber: '5500000000000',
  whatsappDisplay: 'WhatsApp a definir',
  instagramUrl: '#',
  instagramHandle: '@jsvenezianas',
  whatsappMessage:
    'Olá! Encontrei a JS Venezianas pelo site e gostaria de solicitar um orçamento.',
}

export const whatsappUrl = (context?: string) => {
  const message = context
    ? `${siteConfig.whatsappMessage}\n\nTenho interesse em: ${context}.`
    : siteConfig.whatsappMessage
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
