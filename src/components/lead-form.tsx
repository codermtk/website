"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useForm, ValidationError } from "@formspree/react"

interface LeadFormProps {
  onClose: () => void
}

export default function LeadForm({ onClose }: LeadFormProps) {
  // Formspree integration
  const [formspreeState, formspreeSubmit] = useForm("mwplqovg")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companySize: "",
    location: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio"
    }

    if (!formData.companySize) {
      newErrors.companySize = "El tamaño de la empresa es obligatorio"
    }

    if (!formData.location.trim()) {
      newErrors.location = "La ubicación es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      formspreeSubmit(e)
    }
  }

  return (
    <Card className="w-full shadow-lg border border-neutral-800 dark:border-neutral-200 bg-neutral-900/95 dark:bg-white/95 backdrop-blur-md text-white dark:text-black">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-200 dark:text-neutral-600 dark:hover:text-neutral-800"
        >
          <X className="h-5 w-5" />
        </Button>
        <CardTitle className="text-2xl font-bold text-center text-white dark:text-neutral-900">
          {formspreeState.succeeded ? "¡Gracias!" : "Comienza Hoy"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {formspreeState.succeeded ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">¡Tu información ha sido enviada!</h3>
            <p className="text-neutral-300 dark:text-neutral-700">
              Nuestro equipo se pondrá en contacto contigo pronto para discutir cómo podemos ayudar a tu negocio.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white dark:text-black">
                Nombre Completo
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                className={`bg-neutral-800 dark:bg-white border-neutral-700 dark:border-neutral-300 text-white dark:text-black ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-sm text-red-400 dark:text-red-600">{errors.name}</p>}
              <ValidationError
                prefix="Name"
                field="name"
                errors={formspreeState.errors}
                className="text-sm text-red-400 dark:text-red-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white dark:text-black">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                className={`bg-neutral-800 dark:bg-white border-neutral-700 dark:border-neutral-300 text-white dark:text-black ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-400 dark:text-red-600">{errors.email}</p>}
              <ValidationError
                prefix="Email"
                field="email"
                errors={formspreeState.errors}
                className="text-sm text-red-400 dark:text-red-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white dark:text-black">
                Número de Teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder=""
                value={formData.phone}
                onChange={handleChange}
                className={`bg-neutral-800 dark:bg-white border-neutral-700 dark:border-neutral-300 text-white dark:text-black ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-sm text-red-400 dark:text-red-600">{errors.phone}</p>}
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={formspreeState.errors}
                className="text-sm text-red-400 dark:text-red-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize" className="text-white dark:text-black">
                Tamaño de Empresa (Empleados)
              </Label>
              <input type="hidden" name="companySize" value={formData.companySize} />
              <Select value={formData.companySize} onValueChange={(value) => handleSelectChange(value, "companySize")}>
                <SelectTrigger
                  className={`bg-neutral-800 dark:bg-white border-neutral-700 dark:border-neutral-300 text-white dark:text-black ${errors.companySize ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Selecciona el tamaño de empresa" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 dark:bg-white text-white dark:text-black border-neutral-700 dark:border-neutral-300">
                  <SelectItem value="0-250">0-250 empleados</SelectItem>
                  <SelectItem value="250-500">250-500 empleados</SelectItem>
                  <SelectItem value="500-1000">500-1000 empleados</SelectItem>
                  <SelectItem value="1000-5000">1000-5000 empleados</SelectItem>
                  <SelectItem value=">5000">Más de 5000 empleados</SelectItem>
                </SelectContent>
              </Select>
              {errors.companySize && <p className="text-sm text-red-400 dark:text-red-600">{errors.companySize}</p>}
              <ValidationError
                prefix="Company Size"
                field="companySize"
                errors={formspreeState.errors}
                className="text-sm text-red-400 dark:text-red-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white dark:text-black">
                Ubicación Oficinas
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Ciudad, País"
                value={formData.location}
                onChange={handleChange}
                className={`bg-neutral-800 dark:bg-white border-neutral-700 dark:border-neutral-300 text-white dark:text-black ${errors.location ? "border-red-500" : ""}`}
              />
              {errors.location && <p className="text-sm text-red-400 dark:text-red-600">{errors.location}</p>}
              <ValidationError
                prefix="Location"
                field="location"
                errors={formspreeState.errors}
                className="text-sm text-red-400 dark:text-red-600"
              />
            </div>

            <CardFooter className="px-0 pt-4 pb-0">
              <Button
                type="submit"
                disabled={formspreeState.submitting}
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-white to-neutral-200 hover:from-neutral-200 hover:to-white text-black dark:from-neutral-800 dark:to-neutral-900 dark:hover:from-neutral-900 dark:hover:to-black dark:text-white border-2 border-white/70 dark:border-neutral-700 shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                {formspreeState.submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Información"
                )}
              </Button>
            </CardFooter>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

