import React, { useState } from 'react';
import { LEGAL_RESOURCES } from '../data/mockData';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Search, BookOpen, Filter, ShieldAlert } from 'lucide-react';
import { DemoModeBadge } from '../components/common/DemoModeBadge';

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Housing',
    'Employment',
    'Consumer',
    'Contracts',
    'Cybercrime',
    'Family',
    'Legal Documents',
  ];

  const filteredResources = LEGAL_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-1">
          <DemoModeBadge compact />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#102A43] font-sans">
          Legal Knowledge & Guidance Hub
        </h1>
        <p className="text-sm sm:text-base text-[#64748B]">
          Explore educational breakdowns of common contracts, consumer protections, and terms to watch for before signing.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-subtle space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-resources-input"
            name="search-resources-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by topic, contract type, or keyword (e.g. lease, deposit, liability)..."
            aria-label="Search guides by topic, contract type, or keyword"
            className="w-full bg-[#FAF9F5] border border-[#CBD5E1] text-[#102A43] placeholder-[#64748B] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#102A43]/15 focus:border-[#102A43] transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-[#64748B] mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102A43] ${
                selectedCategory === cat
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'bg-[#F1EFE9] text-[#64748B] hover:text-[#102A43] hover:bg-[#EAE5D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#CBD5E1] space-y-2">
          <BookOpen className="w-8 h-8 text-[#64748B] mx-auto" />
          <h3 className="text-base font-bold text-[#102A43]">No guides found</h3>
          <p className="text-xs text-[#64748B]">Try clearing your search query or selecting "All".</p>
        </div>
      )}

      {/* Disclaimer on educational content */}
      <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#E2E8F0] text-xs text-[#64748B] flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-[#C49A3A] mt-0.5 flex-shrink-0" />
        <div>
          <strong className="font-semibold text-[#102A43]">Educational Purpose Only:</strong> The guides provided in this hub represent generalized educational principles for everyday document literacy. Specific statutory rules vary substantially by state, province, and country.
        </div>
      </div>
    </div>
  );
};
