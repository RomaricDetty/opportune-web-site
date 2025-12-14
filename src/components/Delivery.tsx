import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React from 'react'

/**
 * Composant Delivery - Section présentant le service de livraison
 * Met en avant la simplicité du processus de commande et la livraison rapide
 */
const Delivery = () => {
  return (
    <section id="delivery" className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950">
              Livraison
            </span>
            <h2 className="text-3xl md:text-4xl/tight font-semibold text-black mt-4">
              Des Produits de Qualité à Moindre Coût, Livrés Chez Vous
            </h2>
            <p className="text-base font-normal text-muted mt-6 max-w-2xl mx-auto">
              Profitez de nos produits d'électroménager de qualité à des prix imbattables. 
              Un processus simple et rapide pour recevoir vos commandes dans les meilleurs délais.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-start">
                <div className="items-center justify-center flex bg-green-50 rounded-full h-20 w-20 border border-dashed border-green-50">
                  <IconifyIcon
                    icon="lucide:shopping-cart"
                    className="h-8 w-8 text-black"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold pt-6">1. Choisissez votre produit</h3>
              <p className="text-base text-gray-600 font-normal mt-2">
                Parcourez notre catalogue et sélectionnez l'électroménager qui correspond à vos besoins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-start">
                <div className="items-center justify-center flex bg-blue-50 rounded-full h-20 w-20 border border-dashed border-blue-50">
                  <IconifyIcon
                    icon="lucide:file-text"
                    className="h-8 w-8 text-black"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold pt-6">2. Renseignez vos informations</h3>
              <p className="text-base text-gray-600 font-normal mt-2">
                Complétez simplement vos coordonnées et votre adresse de livraison.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-start">
                <div className="items-center justify-center flex bg-primary/10 rounded-full h-20 w-20 border border-dashed border-primary/10">
                  <IconifyIcon
                    icon="lucide:truck"
                    className="h-8 w-8 text-black"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold pt-6">3. Patientez tranquillement</h3>
              <p className="text-base text-gray-600 font-normal mt-2">
                Restez chez vous et recevez votre commande dans les meilleurs délais possibles.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-semibold text-black">
              Des produits de qualité à <span className="text-primary">moindre coût</span>, 
              livrés rapidement et en toute sécurité à votre domicile.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Delivery
