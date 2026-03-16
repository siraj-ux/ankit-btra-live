import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUTMParams, buildRazorpayURL } from '@/hooks/useUTMParams';
import { User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { useFacebookPixel } from "@/hooks/useFacebookPixel";


const RAZORPAY_BASE_URL = 'https://pages.razorpay.com/pl_RkKu9mBvHqnbE1/view'; // Replace with actual Razorpay link
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNqQghsxa10pLaJKRryPO0fs0-02M4diS9pJ2RwZVisD0KeN5q97BZehzijb1LBKLlRQ/exec'; // Add your Google Apps Script Web App URL here

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
}

interface LeadCaptureFormProps {
  upgrade499?: boolean;
}


export const LeadCaptureForm = ({ upgrade499 = false }: LeadCaptureFormProps) => {

  const [fireAddToCart, setFireAddToCart] = useState(false);

  useFacebookPixel(
  fireAddToCart
    ? {
        eventName: "AddToCart",
        eventParams: {
          content_name: "LP2_Product",
          content_category: "LP2_Offer",
          content_ids: ["LP2_IN_99"],
          content_type: "product",
          value: 99,
          currency: "INR",
        },
      }
    : undefined
);

  const utmParams = useUTMParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.length > 50) {
      newErrors.city = 'City must be less than 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendToGoogleSheets = async () => {
  try {
    const formBody = new URLSearchParams({
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      ...utmParams,
      pageUrl: window.location.href,
    });

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formBody,
    });
  } catch (err) {
    console.error('Sheets error:', err);
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setFireAddToCart(true);
    
    // Send to Google Sheets first
    await sendToGoogleSheets();

    
    
  
    // Build Razorpay URL with all parameters
    const razorpayURL = buildRazorpayURL(RAZORPAY_BASE_URL, formData, utmParams);
    
    // Redirect to Razorpay
    window.location.href = razorpayURL;
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange('name')}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange('email')}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
          />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange('phone')}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
          />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange('city')}
            className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary"
          />
          {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
        </div>
      </div>
      
      <Button 
        type="submit" 
        variant="hero" 
        size="xl" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Processing...
          </>
        ) : (
          'Book My Seat @ ₹99'
        )}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground">
        🔒 Your information is 100% secure and will never be shared
      </p>
    </form>
  );
};
