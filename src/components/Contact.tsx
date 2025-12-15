"use client"
import React from 'react'
import IconifyIcon from './wrappers/IconifyIcon'

const Contact = () => {
    return (

        <section id="contact" className="py-20 bg-gray-50">
            <div className="container">
                <div className="grid lg:grid-cols-3 gap-6 items-center">
                    <div>
                        <div>
                            <span className="text-sm text-primary uppercase font-semibold tracking-wider text-default-950 mb-6">
                                Demande de devis
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl/tight font-semibold mt-4">
                            Demande de devis
                        </h2>
                        {/* <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start mt-10">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <IconifyIcon
                                    icon="lucide:map-pin"
                                    className="text-2xl text-primary"
                                />
                            </div>
                            <div>
                                <h5 className="text-base text-muted font-medium mb-1">
                                    Rue de la Paix, 75000 Paris
                                </h5>
                                <a
                                    href="#"
                                    className="text-xs text-primary font-bold uppercase"
                                >
                                    Voir plus
                                </a>
                            </div>
                        </div> */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start mt-10">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <IconifyIcon
                                    icon="lucide:mail"
                                    className="text-2xl text-primary"
                                />
                            </div>
                            <div>
                                <h5 className="text-base text-muted font-medium mb-1">
                                    contact@shop-electro.sn
                                </h5>
                                <a
                                    href="#"
                                    className="text-xs text-primary font-bold uppercase"
                                >
                                    Demande de devis
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:ms-24">
                        <div className="p-6 md:p-12 rounded-md shadow-lg bg-white">
                            <form>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="formFirstName"
                                            className="block text-sm/normal font-semibold text-black mb-2"
                                        >
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            className="block w-full text-sm rounded-md py-3 px-4 border-gray-200 focus:border-gray-300 focus:ring-transparent"
                                            id="formFirstName"
                                            placeholder="Votre prénom..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="formLastName"
                                            className="block text-sm/normal font-semibold text-black mb-2"
                                        >
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            className="block w-full text-sm rounded-md py-3 px-4 border-gray-200 focus:border-gray-300 focus:ring-transparent"
                                            id="formLastName"
                                            placeholder="Votre nom..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="formEmail"
                                            className="block text-sm/normal font-semibold text-black mb-2"
                                        >
                                            Adresse email
                                        </label>
                                        <input
                                            type="email"
                                            className="block w-full text-sm rounded-md py-3 px-4 border-gray-200 focus:border-gray-300 focus:ring-transparent"
                                            id="formEmail"
                                            placeholder="Votre email..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="formPhone"
                                            className="block text-sm/normal font-semibold text-black mb-2"
                                        >
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            type="text"
                                            className="block w-full text-sm rounded-md py-3 px-4 border-gray-200 focus:border-gray-300 focus:ring-transparent"
                                            id="formPhone"
                                            placeholder="Tapez votre numéro de téléphone..."
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="mb-4">
                                            <label
                                                htmlFor="formMessages"
                                                className="block text-sm/normal font-semibold text-black mb-2"
                                            >
                                                Description de la demande
                                            </label>
                                            <textarea
                                                className="block w-full text-sm rounded-md py-3 px-4 border-gray-200 focus:border-gray-300 focus:ring-transparent"
                                                id="formMessages"
                                                rows={4}
                                                placeholder="Tapez la description de la demande..."
                                                required
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center py-2 px-6 rounded-md text-base border border-primary text-white bg-primary hover:bg-primaryDark transition-all duration-500 font-medium"
                                    >
                                        Envoyer la demande{" "}
                                        <IconifyIcon
                                            icon="lucide:send"
                                            className="mdi mdi-send ms-1"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact