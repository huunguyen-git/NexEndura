import KitConfigurator from '@/components/kit-builder/KitConfigurator';
import CustomizationPreview from '@/components/kit-builder/CustomizationPreview';
import PriceCompound from '@/components/kit-builder/PriceCompound';

export default function KitBuilderPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black font-serif text-gray-900 mb-4 tracking-tight">Design Your Kit</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Create the ultimate uniform for your team. Choose your gear, add your name and number, and dominate the field.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <CustomizationPreview />
          <KitConfigurator />
        </div>
        <div className="lg:col-span-4 relative">
          <PriceCompound />
        </div>
      </div>
    </div>
  );
}
