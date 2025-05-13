
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  rating: number;
  sales: number;
  tags: string[];
}

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "经典养生茶礼盒",
      category: "草本茶",
      price: 128,
      originalPrice: 168,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "精选5种中草药材，改善睡眠，调理肠胃",
      rating: 4.8,
      sales: 2546,
      tags: ["热销", "礼盒"]
    },
    {
      id: "2",
      name: "中医艾灸仪",
      category: "中医器械",
      price: 298,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "智能温控，多功能艾灸盒，改善亚健康",
      rating: 4.7,
      sales: 1862,
      tags: ["推荐"]
    },
    {
      id: "3",
      name: "足部按摩器",
      category: "保健器械",
      price: 399,
      originalPrice: 499,
      image: "https://images.unsplash.com/photo-1595145640899-91cdeb6d3193?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "仿真人手法，穴位精准按摩，缓解疲劳",
      rating: 4.9,
      sales: 3245,
      tags: ["热销", "限时折扣"]
    },
    {
      id: "4",
      name: "滋补养生膏",
      category: "滋补品",
      price: 198,
      image: "https://images.unsplash.com/photo-1612708330187-1cdacc6c7f14?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "纯天然草本配方，增强免疫力，适合长期服用",
      rating: 4.6,
      sales: 1356,
      tags: []
    },
    {
      id: "5",
      name: "颈椎按摩仪",
      category: "保健器械",
      price: 259,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "多功能颈部按摩，缓解颈椎不适，改善血液循环",
      rating: 4.5,
      sales: 2189,
      tags: ["限时折扣"]
    },
    {
      id: "6",
      name: "手工刮痧板",
      category: "中医器械",
      price: 68,
      image: "https://images.unsplash.com/photo-1589273429273-991ce1ad11c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      description: "天然牛角材质，传统工艺打造，排毒养颜",
      rating: 4.8,
      sales: 3587,
      tags: ["手工制作"]
    }
  ]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-medical mb-2">健康商城</h1>
            <p className="text-muted-foreground">精选健康养生产品，品质保障</p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <Button variant="outline" className="bg-white">
              <ShoppingCart className="h-4 w-4 mr-2" />
              购物车
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            className="pl-10" 
            placeholder="搜索健康产品"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className="flex overflow-x-auto gap-2 pb-4 mb-4 scrollbar-hide">
          <Button variant="outline" className="rounded-full whitespace-nowrap">全部分类</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">草本茶</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">中医器械</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">保健器械</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">滋补品</Button>
          <Button variant="outline" className="rounded-full whitespace-nowrap">养生套装</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="health-card overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                {product.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} className="bg-medical text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-end">
                    <span className="text-xl font-bold text-medical">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    已售 {product.sales}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-medical hover:bg-medical-dark"
                  onClick={addToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  加入购物车
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
