import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, User, ArrowRight, Search, Phone, Wifi, Smartphone, Globe } from "lucide-react"
import Link from "next/link"

export default function OmanTelecomBlog() {
  const featuredPosts = [
    {
      id: 1,
      title: "إطلاق شبكة 5G الجديدة في مسقط",
      excerpt:
        "تعلن اتصالات عمان عن إطلاق شبكة الجيل الخامس الجديدة في العاصمة مسقط، مما يوفر سرعات إنترنت فائقة للمستخدمين",
      author: "فريق التحرير",
      date: "2024-01-15",
      category: "تقنية",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "خدمات الإنترنت المنزلي الجديدة",
      excerpt: "باقات إنترنت منزلي محدثة بسرعات أعلى وأسعار تنافسية لجميع العملاء في السلطنة",
      author: "أحمد المعمري",
      date: "2024-01-12",
      category: "خدمات",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "تطبيق اتصالات الذكي الجديد",
      excerpt: "تحديث شامل لتطبيق اتصالات عمان مع ميزات جديدة لإدارة الحساب والفواتير",
      author: "سارة الزدجالية",
      date: "2024-01-10",
      category: "تطبيقات",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "الأمن السيبراني في عصر الرقمنة",
      excerpt: "نصائح مهمة لحماية بياناتك الشخصية أثناء استخدام الخدمات الرقمية",
      author: "خالد البلوشي",
      date: "2024-01-08",
      category: "أمان",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const categories = [
    { name: "تقنية", count: 15, icon: Smartphone },
    { name: "خدمات", count: 12, icon: Phone },
    { name: "أمان", count: 8, icon: Globe },
    { name: "تطبيقات", count: 10, icon: Wifi },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">مدونة اتصالات عمان</h1>
                <p className="text-sm text-gray-600">آخر الأخبار والتحديثات التقنية</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
                الرئيسية
              </Link>
              <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
                التقنية
              </Link>
              <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
                الخدمات
              </Link>
              <Link href="#" className="text-gray-700 hover:text-green-600 transition-colors">
                اتصل بنا
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">مرحباً بكم في مدونة اتصالات عمان</h2>
          <p className="text-xl mb-8 opacity-90">اكتشف آخر التطورات في عالم الاتصالات والتقنية في السلطنة</p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input placeholder="ابحث في المقالات..." className="bg-white text-gray-900 placeholder:text-gray-500" />
            <Button variant="secondary" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">المقال المميز</h3>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPosts[0].image || "/placeholder.svg"}
                      alt={featuredPosts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <Badge className="mb-3 bg-green-100 text-green-800 hover:bg-green-200">
                      {featuredPosts[0].category}
                    </Badge>
                    <CardTitle className="text-xl mb-3 text-gray-900">{featuredPosts[0].title}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                      {featuredPosts[0].excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 space-x-4 space-x-reverse">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <User className="h-4 w-4" />
                          <span>{featuredPosts[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Calendar className="h-4 w-4" />
                          <span>{featuredPosts[0].date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        اقرأ المزيد
                        <ArrowRight className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">أحدث المقالات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <CardTitle className="text-lg text-gray-900">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">{post.excerpt}</CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 space-x-1 space-x-reverse">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          اقرأ المزيد
                          <ArrowRight className="h-4 w-4 mr-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">التصنيفات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <category.icon className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-gray-900">اشترك في النشرة الإخبارية</CardTitle>
                <CardDescription>احصل على آخر الأخبار والتحديثات مباشرة في بريدك الإلكتروني</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="البريد الإلكتروني" />
                  <Button className="w-full bg-green-600 hover:bg-green-700">اشترك الآن</Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">المقالات الأكثر قراءة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featuredPosts.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex space-x-3 space-x-reverse">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{post.title}</h4>
                        <p className="text-xs text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">اتصالات عمان</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                شركة رائدة في مجال الاتصالات وتقنية المعلومات في سلطنة عمان
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    خدماتنا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    الدعم الفني
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    الإنترنت المنزلي
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    الهاتف المحمول
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    الحلول المؤسسية
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    شبكة 5G
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-gray-400">
                <p>الهاتف: 800-1234</p>
                <p>البريد الإلكتروني: info@omantel.om</p>
                <p>العنوان: مسقط، سلطنة عمان</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 اتصالات عمان. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
