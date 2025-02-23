export function SocialIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </div>
  );
}
