import { Smile } from "lucide-react";
import { ProfileAdd, ShieldTick } from "iconsax-react";

export default function HowItWorksSection() {
  return (
    <section className="bg-primary/10">
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-primary mb-20">
          Comment ça marche
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <ProfileAdd className="size-14 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Créer un compte</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldTick className="size-14 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Créez votre carte virtuelle
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Smile className="size-14 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Partagez-le avec vos clients
            </h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
