// Substitua os dados abaixo antes da publicação. O número deve conter DDI + DDD, apenas dígitos.
export const siteConfig = {
  companyName: 'JS Venezianas',
  whatsappNumber: '5541984359505',
  whatsappDisplay: '(41) 98435-9505',
  instagramUrl: 'https://www.instagram.com/jspersianas',
  instagramHandle: '@jspersianas',
  serviceArea: 'Curitiba e região metropolitana',
  whatsappMessage:
    'Olá! Encontrei a JS Venezianas pelo site e gostaria de solicitar um orçamento.',
}

export const whatsappUrl = (context?: string) => {
  const message = context
    ? `${siteConfig.whatsappMessage}\n\nTenho interesse em: ${context}.`
    : siteConfig.whatsappMessage
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
